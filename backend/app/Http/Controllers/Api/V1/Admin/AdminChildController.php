<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Child;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminChildController extends Controller
{
    public function index(): JsonResponse
    {
        $children = Child::latest()->get();
        return response()->json($children);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|in:male,female',
            'age_group' => 'nullable|string|max:255',
            'class_name' => 'nullable|string|max:255',
            'parent_name' => 'required|string|max:255',
            'parent_phone' => 'nullable|string|max:20',
            'enrollment_date' => 'nullable|date',
            'status' => 'nullable|in:active,graduated,withdrawn',
            'notes' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('photo');

        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('children', 'public');
            $data['photo_path'] = $photoPath;
        }

        $child = Child::create($data);

        return response()->json([
            'message' => 'کودک با موفقیت اضافه شد.',
            'data' => $child
        ], 201);
    }

    public function show(Child $child): JsonResponse
    {
        return response()->json($child);
    }

    public function update(Request $request, Child $child): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|in:male,female',
            'age_group' => 'nullable|string|max:255',
            'class_name' => 'nullable|string|max:255',
            'parent_name' => 'required|string|max:255',
            'parent_phone' => 'nullable|string|max:20',
            'enrollment_date' => 'nullable|date',
            'status' => 'nullable|in:active,graduated,withdrawn',
            'notes' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('photo');

        if ($request->hasFile('photo')) {
            if ($child->photo_path) {
                \Storage::disk('public')->delete($child->photo_path);
            }
            $photoPath = $request->file('photo')->store('children', 'public');
            $data['photo_path'] = $photoPath;
        }

        $child->update($data);

        return response()->json([
            'message' => 'اطلاعات کودک با موفقیت ویرایش شد.',
            'data' => $child
        ]);
    }

    public function destroy(Child $child): JsonResponse
    {
        if ($child->photo_path) {
            \Storage::disk('public')->delete($child->photo_path);
        }

        $child->delete();

        return response()->json([
            'message' => 'کودک با موفقیت حذف شد.'
        ]);
    }
}
