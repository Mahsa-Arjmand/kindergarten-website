<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminRegistrationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Registration::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('child_first_name', 'like', "%{$search}%")
                    ->orWhere('child_last_name', 'like', "%{$search}%")
                    ->orWhere('parent_first_name', 'like', "%{$search}%")
                    ->orWhere('parent_last_name', 'like', "%{$search}%")
                    ->orWhere('registration_id', 'like', "%{$search}%");
            });
        }

        $registrations = $query->latest()->paginate(20);
        return response()->json($registrations);
    }

    public function show(Registration $registration): JsonResponse
    {
        return response()->json($registration);
    }

    public function update(Request $request, Registration $registration): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:new,reviewing,approved,rejected',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $registration->update($request->all());

        return response()->json([
            'message' => 'وضعیت ثبت‌نام با موفقیت تغییر کرد.',
            'data' => $registration
        ]);
    }

    public function destroy(Registration $registration): JsonResponse
    {
        $registration->delete();

        return response()->json([
            'message' => 'ثبت‌نام با موفقیت حذف شد.'
        ]);
    }
}
