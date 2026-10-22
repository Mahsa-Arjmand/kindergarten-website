<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Gallery;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

echo "=== Test Real API Delete with Auth ===\n\n";

// Get admin user
$admin = User::where('email', 'admin@example.com')->first();
if (!$admin) {
    echo "Admin user not found\n";
    exit;
}

// Create a token for the admin
$token = $admin->createToken('test-token')->plainTextToken;
echo "Created token: " . substr($token, 0, 20) . "...\n\n";

// Get a gallery item
$gallery = Gallery::first();
if (!$gallery) {
    echo "No gallery items found\n";
    exit;
}

$id = $gallery->id;
echo "Before delete:\n";
echo "Total count: " . Gallery::count() . "\n";
echo "Deleting item ID: {$id}\n\n";

// Make HTTP request using Laravel's HTTP client
use Illuminate\Support\Facades\Http;

$response = Http::withHeaders([
    'Authorization' => 'Bearer ' . $token,
    'Accept' => 'application/json',
])->delete('http://localhost:8000/api/v1/admin/gallery/' . $id);

echo "HTTP Response Status: " . $response->status() . "\n";
echo "HTTP Response Body: " . $response->body() . "\n\n";

echo "After delete:\n";
echo "Total count: " . Gallery::count() . "\n";

$deletedItem = Gallery::find($id);
if ($deletedItem) {
    echo "ERROR: Item still exists in database!\n";
} else {
    echo "SUCCESS: Item successfully deleted!\n";
}

// Revoke token
$admin->tokens()->delete();
