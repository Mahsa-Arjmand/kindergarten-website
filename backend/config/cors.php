<?php

$allowedOrigins = array_values(array_filter(array_map(
    'trim',
    explode(',', (string) env('CORS_ALLOWED_ORIGINS', ''))
)));

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | `allowed_origins` is read from the CORS_ALLOWED_ORIGINS env variable
    | (comma separated) so production deployments can add their own domains
    | without touching code. The defaults below cover local development plus
    | the production site, with and without the "www." prefix.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'storage/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => $allowedOrigins ?: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:3000',
        'http://localhost:4173',
        'https://hediehkindergarten.ir',
        'https://www.hediehkindergarten.ir',
        'http://hediehkindergarten.ir',
        'http://www.hediehkindergarten.ir',
    ],

    /*
    | Allow any sub-domain of the production domain (e.g. preview/staging
    | hosts) while still refusing unknown third-party origins.
    */
    'allowed_origins_patterns' => [
        '#^https?://([a-z0-9-]+\.)*hediehkindergarten\.ir$#i',
        '#^https?://([a-z0-9-]+\.)*hediehkindergarden\.ir$#i',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 86400,

    'supports_credentials' => false,

];
