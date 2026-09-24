<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$item = \App\Models\Gallery::find(1);
if ($item) {
    $item->update(['category' => 'classroom', 'caption' => 'تست جدید']);
    echo "Updated successfully\n";
    echo json_encode($item->fresh());
} else {
    echo "Item not found\n";
}
