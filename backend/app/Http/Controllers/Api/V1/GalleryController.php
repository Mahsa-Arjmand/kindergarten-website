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
        $query = Gallery::visible()->ordered();

        if ($request->has('category') && $request->category !== 'all') {
            $query->byCategory($request->category);
        }

        $gallery = $query->get();
        return response()->json($gallery);
    }
}
