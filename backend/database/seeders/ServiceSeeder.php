<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Service::create([
            'title' => 'آموزش پیش‌دبستانی',
            'description' => 'برنامه آموزشی جامع برای کودکان ۳ تا ۶ سال',
            'image_path' => 'service1.jpg',
        ]);

        \App\Models\Service::create([
            'title' => 'مراقبت روزانه',
            'description' => 'مراقبت کامل و ایمن در طول روز',
            'image_path' => 'service2.jpg',
        ]);

        \App\Models\Service::create([
            'title' => 'آموزش زبان',
            'description' => 'کلاس‌های زبان انگلیسی مخصوص کودکان',
            'image_path' => 'service3.jpg',
        ]);

        \App\Models\Service::create([
            'title' => 'هنر و خلاقیت',
            'description' => 'کلاس‌های نقاشی و هنرهای دستی',
            'image_path' => 'service4.jpg',
        ]);

        \App\Models\Service::create([
            'title' => 'موسیقی',
            'description' => 'آموزش موسیقی و آوازخوانی',
            'image_path' => 'service5.jpg',
        ]);

        \App\Models\Service::create([
            'title' => 'ورزش و بازی',
            'description' => 'فعالیت‌های بدنی و بازی‌های گروهی',
            'image_path' => 'service6.jpg',
        ]);

        \App\Models\Service::create([
            'title' => 'تغذیه سالم',
            'description' => 'غذای سالم و مقوی برای کودکان',
            'image_path' => 'service7.jpg',
        ]);
    }
}
