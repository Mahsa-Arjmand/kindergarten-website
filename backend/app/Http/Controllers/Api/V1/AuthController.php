<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
        ]);

        // بررسی اینکه آیا قبلاً مدیر ثبت شده است
        $existingAdmin = User::where('is_admin', true)->first();
        if ($existingAdmin) {
            return response()->json([
                'message' => 'یک مدیر قبلاً ثبت شده است. امکان ثبت‌نام مدیر جدید وجود ندارد.',
            ], 403);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => true,
        ]);

        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'message' => 'ثبت‌نام مدیر با موفقیت انجام شد.',
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['اطلاعات ورود صحیح نیست.'],
            ]);
        }

        // بررسی اینکه کاربر مدیر است
        if (!$user->is_admin) {
            return response()->json([
                'message' => 'شما دسترسی ادمین ندارید.',
            ], 403);
        }

        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'با موفقیت خارج شدید.',
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }
}
