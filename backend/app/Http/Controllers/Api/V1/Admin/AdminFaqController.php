<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminFaqController extends Controller
{
    public function index(): JsonResponse
    {
        $faqs = Faq::latest()->get();
        return response()->json($faqs);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $faq = Faq::create($request->all());

        return response()->json([
            'message' => 'سوال با موفقیت اضافه شد.',
            'data' => $faq
        ], 201);
    }

    public function show(Faq $faq): JsonResponse
    {
        return response()->json($faq);
    }

    public function update(Request $request, Faq $faq): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $faq->update($request->all());

        return response()->json([
            'message' => 'سوال با موفقیت ویرایش شد.',
            'data' => $faq
        ]);
    }

    public function destroy(Faq $faq): JsonResponse
    {
        $faq->delete();

        return response()->json([
            'message' => 'سوال با موفقیت حذف شد.'
        ]);
    }
}
