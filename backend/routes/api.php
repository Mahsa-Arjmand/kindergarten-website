<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ServiceController;
use App\Http\Controllers\Api\V1\ActivityController;
use App\Http\Controllers\Api\V1\TeacherController;
use App\Http\Controllers\Api\V1\GalleryController;
use App\Http\Controllers\Api\V1\NewsController;
use App\Http\Controllers\Api\V1\FaqController;
use App\Http\Controllers\Api\V1\RegistrationController;
use App\Http\Controllers\Api\V1\JobApplicationController;
use App\Http\Controllers\Api\V1\ContactMessageController;
use App\Http\Controllers\Api\V1\Admin\DashboardController;
use App\Http\Controllers\Api\V1\Admin\AdminRegistrationController;
use App\Http\Controllers\Api\V1\Admin\AdminJobApplicationController;
use App\Http\Controllers\Api\V1\Admin\AdminTeacherController;
use App\Http\Controllers\Api\V1\Admin\AdminServiceController;
use App\Http\Controllers\Api\V1\Admin\AdminActivityController;
use App\Http\Controllers\Api\V1\Admin\AdminGalleryController;
use App\Http\Controllers\Api\V1\Admin\AdminNewsController;
use App\Http\Controllers\Api\V1\Admin\AdminFaqController;
use App\Http\Controllers\Api\V1\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public API Routes
Route::prefix('v1')->group(function () {
    // Authentication
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/auth/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

    // Public content
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/activities', [ActivityController::class, 'index']);
    Route::get('/teachers', [TeacherController::class, 'index']);
    Route::get('/gallery', [GalleryController::class, 'index']);
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/faqs', [FaqController::class, 'index']);

    // Forms
    Route::post('/registrations', [RegistrationController::class, 'store']);
    Route::post('/job-applications', [JobApplicationController::class, 'store']);
    Route::post('/contact-messages', [ContactMessageController::class, 'store']);

    // Admin Routes (require authentication and admin role)
    Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index']);

        // Registrations
        Route::get('/registrations', [AdminRegistrationController::class, 'index']);
        Route::get('/registrations/{registration}', [AdminRegistrationController::class, 'show']);
        Route::put('/registrations/{registration}', [AdminRegistrationController::class, 'update']);
        Route::delete('/registrations/{registration}', [AdminRegistrationController::class, 'destroy']);

        // Job Applications
        Route::get('/job-applications', [AdminJobApplicationController::class, 'index']);
        Route::get('/job-applications/{jobApplication}', [AdminJobApplicationController::class, 'show']);
        Route::put('/job-applications/{jobApplication}', [AdminJobApplicationController::class, 'update']);
        Route::delete('/job-applications/{jobApplication}', [AdminJobApplicationController::class, 'destroy']);

        // Teachers
        Route::get('/teachers', [AdminTeacherController::class, 'index']);
        Route::post('/teachers', [AdminTeacherController::class, 'store']);
        Route::get('/teachers/{teacher}', [AdminTeacherController::class, 'show']);
        Route::put('/teachers/{teacher}', [AdminTeacherController::class, 'update']);
        Route::delete('/teachers/{teacher}', [AdminTeacherController::class, 'destroy']);

        // Services
        Route::get('/services', [AdminServiceController::class, 'index']);
        Route::post('/services', [AdminServiceController::class, 'store']);
        Route::get('/services/{service}', [AdminServiceController::class, 'show']);
        Route::put('/services/{service}', [AdminServiceController::class, 'update']);
        Route::delete('/services/{service}', [AdminServiceController::class, 'destroy']);

        // Activities
        Route::get('/activities', [AdminActivityController::class, 'index']);
        Route::post('/activities', [AdminActivityController::class, 'store']);
        Route::get('/activities/{activity}', [AdminActivityController::class, 'show']);
        Route::put('/activities/{activity}', [AdminActivityController::class, 'update']);
        Route::delete('/activities/{activity}', [AdminActivityController::class, 'destroy']);

        // Gallery
        Route::get('/gallery', [AdminGalleryController::class, 'index']);
        Route::post('/gallery', [AdminGalleryController::class, 'store']);
        Route::put('/gallery/{gallery}', [AdminGalleryController::class, 'update']);
        Route::delete('/gallery/{gallery}', [AdminGalleryController::class, 'destroy']);

        // News
        Route::get('/news', [AdminNewsController::class, 'index']);
        Route::post('/news', [AdminNewsController::class, 'store']);
        Route::get('/news/{news}', [AdminNewsController::class, 'show']);
        Route::put('/news/{news}', [AdminNewsController::class, 'update']);
        Route::delete('/news/{news}', [AdminNewsController::class, 'destroy']);

        // FAQs
        Route::get('/faqs', [AdminFaqController::class, 'index']);
        Route::post('/faqs', [AdminFaqController::class, 'store']);
        Route::get('/faqs/{faq}', [AdminFaqController::class, 'show']);
        Route::put('/faqs/{faq}', [AdminFaqController::class, 'update']);
        Route::delete('/faqs/{faq}', [AdminFaqController::class, 'destroy']);
    });
});
