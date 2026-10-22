<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Gallery;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

echo "=== Test FormData Update ===\n\n";

// Get admin user
$admin = User::where('email', 'admin@example.com')->first();
if (!$admin) {
    echo "Admin user not found\n";
    exit;
}

$token = $admin->createToken('test-token')->plainTextToken;
echo "Created token\n\n";

// Get a gallery item
$gallery = Gallery::first();
if (!$gallery) {
    echo "No gallery items found\n";
    exit;
}

$id = $gallery->id;
echo "Updating item ID: {$id}\n\n";

// Create FormData
$data = [
    '_method' => 'PUT',
    'category' => 'classroom',
    'caption' => 'test update',
];

use Illuminate\Support\Facades\Http;

$response = Http::asMultipart()->withHeaders([
    'Authorization' => 'Bearer ' . $token,
    'Accept' => 'application/json',
])->post('http://localhost:8000/api/v1/admin/gallery/' . $id, $data);

echo "HTTP Response Status: " . $response->status() . "\n";
echo "HTTP Response Body: " . $response->body() . "\n\n";

echo "After update:\n";
$updatedItem = Gallery::find($id);
if ($updatedItem) {
    echo "Item category: {$updatedItem->category}\n";
    echo "Item caption: {$updatedItem->caption}\n";
} else {
    echo "Item not found!\n";
}

$admin->tokens()->delete();
