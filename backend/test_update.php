<?php

// Test UPDATE endpoint
$token = "2|FVXbHWfoJJroQxn3ck82BVfWwahIVjkvIvxoVgh22167048f";
$url = "http://127.0.0.1:8000/api/v1/admin/gallery/1";

$data = [
    'category' => 'classroom',
    'caption' => 'تست جدید',
    '_method' => 'PUT'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $token",
    "Accept: application/json",
    "Content-Type: application/x-www-form-urlencoded"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: $httpCode\n";
echo "Response: $response\n";
