<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminActivityController extends Controller
{
    public function index(): JsonResponse
    {
        $activities = Activity::latest()->get();
        return response()->json($activities);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'age_group' => 'required|string|max:50',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('activities', 'public');
            $data['image_path'] = $imagePath;
        }

        $activity = Activity::create($data);

        return response()->json([
            'message' => 'فعالیت با موفقیت اضافه شد.',
            'data' => $activity
        ], 201);
    }

    public function show(Activity $activity): JsonResponse
    {
        return response()->json($activity);
    }

    public function update(Request $request, Activity $activity): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'age_group' => 'required|string|max:50',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            if ($activity->image_path) {
                \Storage::disk('public')->delete($activity->image_path);
            }
            $imagePath = $request->file('image')->store('activities', 'public');
            $data['image_path'] = $imagePath;
        }

        $activity->update($data);

        return response()->json([
            'message' => 'فعالیت با موفقیت ویرایش شد.',
            'data' => $activity
        ]);
    }

    public function destroy(Activity $activity): JsonResponse
    {
        if ($activity->image_path) {
            \Storage::disk('public')->delete($activity->image_path);
        }

        $activity->delete();

        return response()->json([
            'message' => 'فعالیت با موفقیت حذف شد.'
        ]);
    }
}
