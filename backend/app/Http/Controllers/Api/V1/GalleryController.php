<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class GalleryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $hasHeroColumn = Schema::hasColumn('gallery', 'is_hero');
        $query = Gallery::query();

        // Keep existing image galleries available before the video migration is applied.
        if (Schema::hasColumn('gallery', 'is_visible')) {
            $query->where('is_visible', true);
        }
        if ($hasHeroColumn) {
            $query->orderByDesc('is_hero');
        }
        $query->orderBy('created_at', 'desc');

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->boolean('home')) {
            $query->where(function ($media) use ($hasHeroColumn) {
                $media->whereNotNull('image_path');
                if ($hasHeroColumn) {
                    $media->orWhere('is_hero', true);
                }
            })->limit(5);
        }

        return response()->json($query->get());
    }
}
