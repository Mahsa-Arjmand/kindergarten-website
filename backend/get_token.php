<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = \App\Models\User::where('email', 'admin@example.com')->first();
if ($user) {
    $token = $user->createToken('admin-token')->plainTextToken;
    echo "Token: " . $token . PHP_EOL;
} else {
    echo "User not found" . PHP_EOL;
}
