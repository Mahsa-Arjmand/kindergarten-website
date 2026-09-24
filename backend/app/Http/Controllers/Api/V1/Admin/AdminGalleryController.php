<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminGalleryController extends Controller
{
    public function index(): JsonResponse
    {
        $gallery = Gallery::latest()->get();
        return response()->json($gallery);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'category' => 'required|in:classroom,playground,activities,events,food',
            'caption' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('gallery', 'public');
            $data['image_path'] = $imagePath;
        }

        $galleryItem = Gallery::create($data);

        return response()->json([
            'message' => 'تصویر با موفقیت اضافه شد.',
            'data' => $galleryItem
        ], 201);
    }

    public function update(Request $request, Gallery $gallery): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'category' => 'required|in:classroom,playground,activities,events,food',
            'caption' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            if ($gallery->image_path) {
                \Storage::disk('public')->delete($gallery->image_path);
            }
            $imagePath = $request->file('image')->store('gallery', 'public');
            $data['image_path'] = $imagePath;
        }

        $gallery->update($data);
        $gallery->refresh();

        return response()->json([
            'message' => 'تصویر با موفقیت ویرایش شد.',
            'data' => $gallery
        ]);
    }

    public function destroy(Gallery $gallery): JsonResponse
    {
        if ($gallery->image_path) {
            \Storage::disk('public')->delete($gallery->image_path);
        }

        $gallery->delete();

        return response()->json([
            'message' => 'تصویر با موفقیت حذف شد.'
        ]);
    }
}
