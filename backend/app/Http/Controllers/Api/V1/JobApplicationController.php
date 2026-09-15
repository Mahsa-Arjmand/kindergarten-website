<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobApplicationController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'age' => 'required|integer|min:18|max:70',
            'education' => 'required|string|max:255',
            'field_of_study' => 'required|string|max:255',
            'work_experience' => 'nullable|string',
            'skills' => 'nullable|string',
            'notes' => 'nullable|string',
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('cv');

        if ($request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('cvs', 'public');
            $data['cv_path'] = $cvPath;
        }

        $jobApplication = JobApplication::create($data);

        return response()->json([
            'message' => 'درخواست همکاری شما با موفقیت ارسال شد.',
            'data' => $jobApplication
        ], 201);
    }
}
