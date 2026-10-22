<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Gallery;
use Illuminate\Support\Facades\Auth;

echo "=== Test API Delete ===\n\n";

// Get an admin user
$admin = \App\Models\User::where('email', 'admin@example.com')->first();
if (!$admin) {
    echo "Admin user not found\n";
    exit;
}

Auth::login($admin);

// Get a gallery item
$gallery = Gallery::first();
if (!$gallery) {
    echo "No gallery items found\n";
    exit;
}

$id = $gallery->id;
echo "Before API delete:\n";
echo "Total count: " . Gallery::count() . "\n";
echo "Deleting item ID: {$id} via API...\n\n";

// Simulate API delete
$controller = new \App\Http\Controllers\Api\V1\Admin\AdminGalleryController();
$request = \Illuminate\Http\Request::create("/admin/gallery/{$id}", 'DELETE');

try {
    $response = $controller->destroy($gallery);
    echo "API Response: " . json_encode($response->getData()) . "\n\n";
} catch (\Exception $e) {
    echo "API Error: " . $e->getMessage() . "\n\n";
}

echo "After API delete:\n";
echo "Total count: " . Gallery::count() . "\n";

$deletedItem = Gallery::find($id);
if ($deletedItem) {
    echo "ERROR: Item still exists in database!\n";
} else {
    echo "SUCCESS: Item successfully deleted via API!\n";
}

echo "\n\n=== Test API GET After Delete ===\n\n";

// Test GET endpoint
$controller2 = new \App\Http\Controllers\Api\V1\Admin\AdminGalleryController();
$getResponse = $controller2->index();
$data = $getResponse->getData();
echo "GET Response count: " . count($data) . "\n";
