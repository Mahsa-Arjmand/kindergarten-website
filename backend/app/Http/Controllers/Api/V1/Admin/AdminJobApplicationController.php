<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminJobApplicationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = JobApplication::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $applications = $query->latest()->get();
        return response()->json($applications);
    }

    public function show(JobApplication $jobApplication): JsonResponse
    {
        return response()->json($jobApplication);
    }

    public function update(Request $request, JobApplication $jobApplication): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:new,reviewing,interview,accepted,rejected',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $jobApplication->update($request->all());

        return response()->json([
            'message' => 'وضعیت درخواست با موفقیت تغییر کرد.',
            'data' => $jobApplication
        ]);
    }

    public function destroy(JobApplication $jobApplication): JsonResponse
    {
        $jobApplication->delete();

        return response()->json([
            'message' => 'درخواست با موفقیت حذف شد.'
        ]);
    }
}
