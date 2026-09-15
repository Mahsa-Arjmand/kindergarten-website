<?php

namespace Database\Seeders;

use App\Models\Teacher;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Teacher::create([
            'name' => 'سارا احمدی',
            'position' => 'مربی پیش‌دبستانی',
            'education' => 'لیسانس مربیگری کودک',
            'specialization' => 'آموزش پیش‌دبستانی',
            'experience' => '۱۰ سال تجربه در آموزش کودکان',
            'bio' => 'با ۱۰ سال تجربه در آموزش کودکان پیش‌دبستانی',
            'image_path' => 'teacher1.jpg',
        ]);

        \App\Models\Teacher::create([
            'name' => 'مریم رضایی',
            'position' => 'مربی هنر',
            'education' => 'لیسانس هنر',
            'specialization' => 'آموزش هنر کودکان',
            'experience' => '۸ سال تجربه در آموزش هنر',
            'bio' => 'متخصص در آموزش هنر و خلاقیت کودکان',
            'image_path' => 'teacher2.jpg',
        ]);

        \App\Models\Teacher::create([
            'name' => 'فاطمه محمدی',
            'position' => 'مربی موسیقی',
            'education' => 'لیسانس موسیقی',
            'specialization' => 'آموزش موسیقی کودکان',
            'experience' => '۶ سال تجربه در آموزش موسیقی',
            'bio' => 'متخصص در آموزش موسیقی کودکان',
            'image_path' => 'teacher3.jpg',
        ]);

        \App\Models\Teacher::create([
            'name' => 'زهرا کریمی',
            'position' => 'مربی زبان',
            'education' => 'لیسانس زبان انگلیسی',
            'specialization' => 'آموزش زبان کودکان',
            'experience' => '۵ سال تجربه در آموزش زبان',
            'bio' => 'متخصص در آموزش زبان انگلیسی کودکان',
            'image_path' => 'teacher4.jpg',
        ]);

        \App\Models\Teacher::create([
            'name' => 'نازنین حسینی',
            'position' => 'مربی ورزش',
            'education' => 'لیسانس تربیت بدنی',
            'specialization' => 'فعالیت بدنی کودکان',
            'experience' => '۷ سال تجربه در فعالیت‌های بدنی',
            'bio' => 'متخصص در فعالیت‌های بدنی کودکان',
            'image_path' => 'teacher5.jpg',
        ]);
    }
}
