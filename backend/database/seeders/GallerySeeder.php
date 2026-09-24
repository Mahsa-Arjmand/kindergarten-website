<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['classroom', 'playground', 'activities', 'events', 'food'];
        for ($i = 1; $i <= 20; $i++) {
            \App\Models\Gallery::create([
                'image_path' => "gallery{$i}.jpg",
                'category' => $categories[$i % count($categories)],
                'caption' => "توضیحات تصویر {$i}",
            ]);
        }
    }
}
