<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\News::create([
            'title' => 'افتتاح کلاس‌های جدید',
            'content' => 'کودکستان هدیه کلاس‌های جدیدی را برای کودکان افتتاح می‌کند...',
            'image_path' => 'news1.jpg',
            'publish_date' => now()->toDateString(),
            'status' => 'published',
        ]);

        \App\Models\News::create([
            'title' => 'جشن سال نو',
            'content' => 'جشن سال نو با برنامه‌های شاد برای کودکان برگزار می‌شود...',
            'image_path' => 'news2.jpg',
            'publish_date' => now()->subDays(7)->toDateString(),
            'status' => 'published',
        ]);

        \App\Models\News::create([
            'title' => 'دوره تابستانی',
            'content' => 'ثبت‌نام دوره تابستانی کودکستان هدیه آغاز شد...',
            'image_path' => 'news3.jpg',
            'publish_date' => now()->subDays(14)->toDateString(),
            'status' => 'published',
        ]);

        \App\Models\News::create([
            'title' => 'جشن پایان سال تحصیلی',
            'content' => 'جشن پایان سال تحصیلی با حضور والدین و کودکان...',
            'image_path' => 'news4.jpg',
            'publish_date' => now()->subDays(21)->toDateString(),
            'status' => 'published',
        ]);

        \App\Models\News::create([
            'title' => 'کارگاه آموزشی برای والدین',
            'content' => 'کارگاه آموزشی برای والدین در زمینه تربیت کودکان...',
            'image_path' => 'news5.jpg',
            'publish_date' => now()->subDays(28)->toDateString(),
            'status' => 'published',
        ]);
    }
}
