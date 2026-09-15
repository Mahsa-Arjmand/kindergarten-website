<?php

namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Activity::create([
            'title' => 'نقاشی گروهی',
            'description' => 'کودکان با هم نقاشی می‌کنند و خلاقیت خود را نشان می‌دهند',
            'image_path' => 'activity1.jpg',
            'age_group' => '۳-۶ سال',
        ]);

        \App\Models\Activity::create([
            'title' => 'جشن تولد',
            'description' => 'جشن تولد کودکان ماه تولد',
            'image_path' => 'activity2.jpg',
            'age_group' => '۲-۶ سال',
        ]);

        \App\Models\Activity::create([
            'title' => 'سفر به پارک',
            'description' => 'سیر و سیاحت در پارک شهر',
            'image_path' => 'activity3.jpg',
            'age_group' => '۳-۶ سال',
        ]);

        \App\Models\Activity::create([
            'title' => 'کلاس آشپزی',
            'description' => 'آموزش تهیه غذاهای ساده برای کودکان',
            'image_path' => 'activity4.jpg',
            'age_group' => '۴-۶ سال',
        ]);

        \App\Models\Activity::create([
            'title' => 'کنسرت موسیقی',
            'description' => 'اجرای موسیقی توسط کودکان',
            'image_path' => 'activity5.jpg',
            'age_group' => '۳-۶ سال',
        ]);

        \App\Models\Activity::create([
            'title' => 'بازی‌های گروهی',
            'description' => 'بازی‌های تعاملی و گروهی',
            'image_path' => 'activity6.jpg',
            'age_group' => '۲-۶ سال',
        ]);

        \App\Models\Activity::create([
            'title' => 'داستان‌خوانی',
            'description' => 'خواندن داستان‌های جذاب برای کودکان',
            'image_path' => 'activity7.jpg',
            'age_group' => '۳-۶ سال',
        ]);

        \App\Models\Activity::create([
            'title' => 'کلاس علمی',
            'description' => 'آزمایش‌های علمی ساده و جالب',
            'image_path' => 'activity8.jpg',
            'age_group' => '۴-۶ سال',
        ]);
    }
}
