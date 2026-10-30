<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AdminGalleryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Gallery::latest()->get());
    }

    public function store(Request $request): JsonResponse
    {
        $mediaType = $request->input('media_type', $request->hasFile('video') ? 'video' : 'image');
        $validator = Validator::make($request->all(), [
            'media_type' => 'sometimes|in:image,video',
            'image' => 'required_if:media_type,image|nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'video' => 'required_if:media_type,video|nullable|mimes:mp4,webm,ogg|max:256000',
            'category' => 'required|in:classroom,playground,activities,events,food',
            'caption' => 'nullable|string|max:255',
            'is_hero' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $item = new Gallery([
            'category' => $request->input('category'),
            'caption' => $request->input('caption'),
            'is_hero' => $mediaType === 'video' && $request->boolean('is_hero'),
            'is_visible' => true,
        ]);
        $this->storeMedia($request, $item, $mediaType);
        $item->save();

        if ($item->is_hero) {
            Gallery::where('id', '!=', $item->id)->update(['is_hero' => false]);
        }

        return response()->json(['message' => 'رسانه با موفقیت اضافه شد.', 'data' => $item], 201);
    }

    public function update(Request $request, Gallery $gallery): JsonResponse
    {
        $defaultType = $gallery->video_path ? 'video' : 'image';
        $mediaType = $request->input('media_type', $defaultType);
        $validator = Validator::make($request->all(), [
            'media_type' => 'sometimes|in:image,video',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'video' => 'nullable|mimes:mp4,webm,ogg|max:256000',
            'category' => 'required|in:classroom,playground,activities,events,food',
            'caption' => 'nullable|string|max:255',
            'is_hero' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        if ($mediaType === 'image' && !$request->hasFile('image') && !$gallery->image_path) {
            return response()->json(['errors' => ['image' => ['انتخاب تصویر الزامی است.']]], 422);
        }
        if ($mediaType === 'video' && !$request->hasFile('video') && !$gallery->video_path) {
            return response()->json(['errors' => ['video' => ['انتخاب ویدیو الزامی است.']]], 422);
        }

        $gallery->category = $request->input('category');
        $gallery->caption = $request->input('caption');
        $gallery->is_hero = $mediaType === 'video' && $request->boolean('is_hero');
        $this->storeMedia($request, $gallery, $mediaType);
        $gallery->save();

        if ($gallery->is_hero) {
            Gallery::where('id', '!=', $gallery->id)->update(['is_hero' => false]);
        }

        return response()->json(['message' => 'رسانه با موفقیت ویرایش شد.', 'data' => $gallery->refresh()]);
    }

    public function destroy(Gallery $gallery): JsonResponse
    {
        if ($gallery->image_path) {
            Storage::disk('public')->delete($gallery->image_path);
        }
        if ($gallery->video_path) {
            Storage::disk('public')->delete($gallery->video_path);
        }
        $gallery->delete();

        return response()->json(['message' => 'رسانه با موفقیت حذف شد.']);
    }

    private function storeMedia(Request $request, Gallery $gallery, string $mediaType): void
    {
        if ($mediaType === 'image' && $request->hasFile('image')) {
            if ($gallery->video_path) Storage::disk('public')->delete($gallery->video_path);
            $gallery->image_path = $request->file('image')->store('gallery', 'public');
            $gallery->video_path = null;
        }
        if ($mediaType === 'video' && $request->hasFile('video')) {
            if ($gallery->image_path) Storage::disk('public')->delete($gallery->image_path);
            $gallery->video_path = $request->file('video')->store('gallery/videos', 'public');
            $gallery->image_path = null;
        }
        if ($mediaType === 'image') $gallery->is_hero = false;
    }
}
