<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminNewsController extends Controller
{
    public function index(): JsonResponse
    {
        $news = News::latest()->get();
        return response()->json($news);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'publish_date' => 'required|date',
            'status' => 'required|in:draft,published',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('news', 'public');
            $data['image_path'] = $imagePath;
        }

        $news = News::create($data);

        return response()->json([
            'message' => 'خبر با موفقیت اضافه شد.',
            'data' => $news
        ], 201);
    }

    public function show(News $news): JsonResponse
    {
        return response()->json($news);
    }

    public function update(Request $request, News $news): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'publish_date' => 'required|date',
            'status' => 'required|in:draft,published',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            if ($news->image_path) {
                \Storage::disk('public')->delete($news->image_path);
            }
            $imagePath = $request->file('image')->store('news', 'public');
            $data['image_path'] = $imagePath;
        }

        $news->update($data);

        return response()->json([
            'message' => 'خبر با موفقیت ویرایش شد.',
            'data' => $news
        ]);
    }

    public function destroy(News $news): JsonResponse
    {
        if ($news->image_path) {
            \Storage::disk('public')->delete($news->image_path);
        }

        $news->delete();

        return response()->json([
            'message' => 'خبر با موفقیت حذف شد.'
        ]);
    }
}
