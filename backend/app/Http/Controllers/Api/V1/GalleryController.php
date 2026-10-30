<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Gallery::visible()->orderByDesc('is_hero')->orderBy('created_at', 'desc');

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->boolean('home')) {
            $query->where(function ($media) {
                $media->whereNotNull('image_path')->orWhere('is_hero', true);
            })->limit(5);
        }

        $gallery = $query->get();
        return response()->json($gallery);
    }
}
