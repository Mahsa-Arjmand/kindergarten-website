<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminServiceController extends Controller
{
    public function index(): JsonResponse
    {
        $services = Service::latest()->get();
        return response()->json($services);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('services', 'public');
            $data['image_path'] = $imagePath;
        }

        $service = Service::create($data);

        return response()->json([
            'message' => 'خدمت با موفقیت اضافه شد.',
            'data' => $service
        ], 201);
    }

    public function show(Service $service): JsonResponse
    {
        return response()->json($service);
    }

    public function update(Request $request, Service $service): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'boolean',
            'order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            if ($service->image_path) {
                \Storage::disk('public')->delete($service->image_path);
            }
            $imagePath = $request->file('image')->store('services', 'public');
            $data['image_path'] = $imagePath;
        }

        $service->update($data);

        return response()->json([
            'message' => 'خدمت با موفقیت ویرایش شد.',
            'data' => $service
        ]);
    }

    public function destroy(Service $service): JsonResponse
    {
        if ($service->image_path) {
            \Storage::disk('public')->delete($service->image_path);
        }

        $service->delete();

        return response()->json([
            'message' => 'خدمت با موفقیت حذف شد.'
        ]);
    }
}
