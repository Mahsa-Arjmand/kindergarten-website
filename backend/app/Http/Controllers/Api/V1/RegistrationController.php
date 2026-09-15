<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegistrationController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'child_first_name' => 'required|string|max:255',
            'child_last_name' => 'required|string|max:255',
            'child_birth_date' => 'required|date',
            'child_gender' => 'required|in:male,female',
            'age_group' => 'required|string|max:50',
            'child_notes' => 'nullable|string',
            'parent_first_name' => 'required|string|max:255',
            'parent_last_name' => 'required|string|max:255',
            'parent_relation' => 'required|string|max:50',
            'phone' => 'required|string|max:20',
            'phone_secondary' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'preferred_program' => 'required|string|max:255',
            'preferred_time' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $registration = Registration::create($request->all());

        return response()->json([
            'message' => 'درخواست ثبت‌نام شما با موفقیت ارسال شد.',
            'registration_id' => $registration->registration_id,
            'data' => $registration
        ], 201);
    }
}
