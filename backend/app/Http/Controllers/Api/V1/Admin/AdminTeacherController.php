<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminTeacherController extends Controller
{
    public function index(): JsonResponse
    {
        $teachers = Teacher::latest()->get();
        return response()->json($teachers);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'education' => 'required|string|max:255',
            'specialization' => 'required|string|max:255',
            'experience' => 'nullable|string',
            'bio' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('teachers', 'public');
            $data['image_path'] = $imagePath;
        }

        $teacher = Teacher::create($data);

        return response()->json([
            'message' => 'مربی با موفقیت اضافه شد.',
            'data' => $teacher
        ], 201);
    }

    public function show(Teacher $teacher): JsonResponse
    {
        return response()->json($teacher);
    }

    public function update(Request $request, Teacher $teacher): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'education' => 'required|string|max:255',
            'specialization' => 'required|string|max:255',
            'experience' => 'nullable|string',
            'bio' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($teacher->image_path) {
                \Storage::disk('public')->delete($teacher->image_path);
            }
            $imagePath = $request->file('image')->store('teachers', 'public');
            $data['image_path'] = $imagePath;
        }

        $teacher->update($data);

        return response()->json([
            'message' => 'مربی با موفقیت ویرایش شد.',
            'data' => $teacher
        ]);
    }

    public function destroy(Teacher $teacher): JsonResponse
    {
        // Delete image if exists
        if ($teacher->image_path) {
            \Storage::disk('public')->delete($teacher->image_path);
        }

        $teacher->delete();

        return response()->json([
            'message' => 'مربی با موفقیت حذف شد.'
        ]);
    }
}
