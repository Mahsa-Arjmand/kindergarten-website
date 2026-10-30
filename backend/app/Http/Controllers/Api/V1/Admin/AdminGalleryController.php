<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

class AdminGalleryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Gallery::latest()->get());
    }

    public function storeVideoChunk(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'upload_id' => 'required|uuid',
            'chunk_index' => 'required|integer|min:0|max:299',
            'total_chunks' => 'required|integer|min:1|max:300',
            'chunk' => 'required|file|max:900',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ((int) $request->input('chunk_index') >= (int) $request->input('total_chunks')) {
            return response()->json(['message' => 'شماره بخش ویدیو معتبر نیست.'], 422);
        }

        $directory = $this->chunkDirectory($request, $request->input('upload_id'));
        $path = $request->file('chunk')->storeAs(
            $directory,
            'chunk-' . (int) $request->input('chunk_index'),
            'local'
        );

        if (!$path) {
            return response()->json(['message' => 'ذخیره بخش ویدیو ناموفق بود.'], 500);
        }

        return response()->json(['message' => 'بخش دریافت شد.']);
    }

    public function completeVideoUpload(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'upload_id' => 'required|uuid',
            'total_chunks' => 'required|integer|min:1|max:300',
            'original_name' => 'required|string|max:255',
            'gallery_id' => 'nullable|integer|exists:gallery,id',
            'category' => 'required|in:classroom,playground,activities,events,food',
            'caption' => 'nullable|string|max:255',
            'is_hero' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $directory = $this->chunkDirectory($request, $request->input('upload_id'));
        $disk = Storage::disk('local');
        $totalChunks = (int) $request->input('total_chunks');

        $totalBytes = 0;
        for ($index = 0; $index < $totalChunks; $index++) {
            $chunkPath = $directory . '/chunk-' . $index;
            if (!$disk->exists($chunkPath)) {
                $disk->deleteDirectory($directory);
                return response()->json(['message' => 'بخشی از ویدیو دریافت نشده است؛ لطفاً دوباره تلاش کنید.'], 422);
            }
            $totalBytes += $disk->size($chunkPath);
            if ($totalBytes > 256000 * 1024) {
                $disk->deleteDirectory($directory);
                return response()->json(['message' => 'حجم ویدیو نباید بیشتر از ۲۵۰ مگابایت باشد.'], 422);
            }
        }

        $assembledRelativePath = $directory . '/assembled-video';
        $assembledPath = $disk->path($assembledRelativePath);
        $target = fopen($assembledPath, 'wb');
        if ($target === false) {
            $disk->deleteDirectory($directory);
            return response()->json(['message' => 'آماده‌سازی ویدیو ناموفق بود.'], 500);
        }

        try {
            for ($index = 0; $index < $totalChunks; $index++) {
                $source = fopen($disk->path($directory . '/chunk-' . $index), 'rb');
                if ($source === false) {
                    fclose($target);
                    return response()->json(['message' => 'خواندن بخش ویدیو ناموفق بود.'], 500);
                }
                stream_copy_to_stream($source, $target);
                fclose($source);
            }
            fclose($target);

            $video = new UploadedFile(
                $assembledPath,
                basename($request->input('original_name')),
                null,
                UPLOAD_ERR_OK,
                true
            );
            $videoValidator = Validator::make(['video' => $video], [
                'video' => 'required|file|mimes:mp4,webm,ogg|max:256000',
            ]);
            if ($videoValidator->fails()) {
                return response()->json(['errors' => $videoValidator->errors()], 422);
            }

            $gallery = $request->filled('gallery_id')
                ? Gallery::findOrFail($request->integer('gallery_id'))
                : new Gallery(['is_visible' => true]);
            $previousImage = $gallery->image_path;
            $previousVideo = $gallery->video_path;
            $gallery->category = $request->input('category');
            $gallery->caption = $request->input('caption');
            $gallery->is_hero = $request->boolean('is_hero');
            $gallery->video_path = $video->store('gallery/videos', 'public');
            $gallery->image_path = null;
            $gallery->save();

            if ($previousImage) Storage::disk('public')->delete($previousImage);
            if ($previousVideo) Storage::disk('public')->delete($previousVideo);
            if ($gallery->is_hero) {
                Gallery::where('id', '!=', $gallery->id)->update(['is_hero' => false]);
            }

            return response()->json([
                'message' => 'ویدیو با موفقیت ذخیره شد.',
                'data' => $gallery->refresh(),
            ], $gallery->wasRecentlyCreated ? 201 : 200);
        } finally {
            $disk->deleteDirectory($directory);
        }
    }

    public function cancelVideoUpload(Request $request, string $uploadId): JsonResponse
    {
        if (!preg_match('/^[0-9a-f-]{36}$/i', $uploadId)) {
            return response()->json(['message' => 'شناسه آپلود نامعتبر است.'], 422);
        }

        Storage::disk('local')->deleteDirectory($this->chunkDirectory($request, $uploadId));
        return response()->json(['message' => 'بخش‌های موقت ویدیو حذف شدند.']);
    }

    private function chunkDirectory(Request $request, string $uploadId): string
    {
        return 'gallery-chunks/' . $request->user()->getAuthIdentifier() . '/' . $uploadId;
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
