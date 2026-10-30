<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            $key = $request->user()?->getAuthIdentifier() ?? $request->ip();

            // Chunked gallery uploads need many small requests. Keep the normal
            // API limit unchanged, but allow up to 600 upload chunks per minute.
            if ($request->is('api/v1/admin/gallery/video-chunks*')) {
                return Limit::perMinute(600)->by('gallery-upload:' . $key);
            }

            return Limit::perMinute(60)->by($key);
        });
    }
}
