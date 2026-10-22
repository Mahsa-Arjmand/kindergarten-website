<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Gallery;

echo "=== Test Gallery Delete ===\n\n";

// Get a gallery item
$gallery = Gallery::first();
if (!$gallery) {
    echo "No gallery items found\n";
    exit;
}

echo "Before delete:\n";
echo "Total count: " . Gallery::count() . "\n";
echo "Item ID: {$gallery->id}\n";
echo "Item category: {$gallery->category}\n";
echo "Item caption: {$gallery->caption}\n\n";

// Delete the item
$id = $gallery->id;
echo "Deleting item ID: {$id}...\n";
$gallery->delete();

echo "\nAfter delete:\n";
echo "Total count: " . Gallery::count() . "\n";

// Check if item still exists
$deletedItem = Gallery::find($id);
if ($deletedItem) {
    echo "ERROR: Item still exists in database!\n";
} else {
    echo "SUCCESS: Item successfully deleted from database!\n";
}

echo "\n\n=== Test Gallery Update ===\n\n";

// Get another gallery item
$gallery2 = Gallery::first();
if (!$gallery2) {
    echo "No gallery items found for update test\n";
    exit;
}

echo "Before update:\n";
echo "Item ID: {$gallery2->id}\n";
echo "Item category: {$gallery2->category}\n";
echo "Item caption: {$gallery2->caption}\n\n";

// Update the item
echo "Updating item ID: {$gallery2->id}...\n";
$gallery2->category = 'test_category';
$gallery2->caption = 'test_caption';
$gallery2->save();

echo "\nAfter update:\n";
$updatedItem = Gallery::find($gallery2->id);
echo "Item category: {$updatedItem->category}\n";
echo "Item caption: {$updatedItem->caption}\n";

if ($updatedItem->category === 'test_category' && $updatedItem->caption === 'test_caption') {
    echo "SUCCESS: Item successfully updated in database!\n";
} else {
    echo "ERROR: Item not updated correctly!\n";
}
