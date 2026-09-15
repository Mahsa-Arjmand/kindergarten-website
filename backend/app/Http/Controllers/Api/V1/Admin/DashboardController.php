<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Models\JobApplication;
use App\Models\ContactMessage;
use App\Models\Teacher;
use App\Models\Service;
use App\Models\Activity;
use App\Models\Gallery;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'registrations' => [
                'total' => Registration::count(),
                'new' => Registration::where('status', 'new')->count(),
                'reviewing' => Registration::where('status', 'reviewing')->count(),
                'approved' => Registration::where('status', 'approved')->count(),
                'rejected' => Registration::where('status', 'rejected')->count(),
            ],
            'job_applications' => [
                'total' => JobApplication::count(),
                'new' => JobApplication::where('status', 'new')->count(),
                'reviewing' => JobApplication::where('status', 'reviewing')->count(),
                'interview' => JobApplication::where('status', 'interview')->count(),
                'accepted' => JobApplication::where('status', 'accepted')->count(),
                'rejected' => JobApplication::where('status', 'rejected')->count(),
            ],
            'contact_messages' => [
                'total' => ContactMessage::count(),
                'unread' => ContactMessage::where('is_read', false)->count(),
            ],
            'teachers' => Teacher::count(),
            'services' => Service::count(),
            'activities' => Activity::count(),
            'gallery' => Gallery::count(),
        ]);
    }
}
