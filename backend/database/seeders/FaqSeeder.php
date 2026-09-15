<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Faq::create([
            'question' => 'سن کودکان برای ثبت‌نام چقدر است؟',
            'answer' => 'کودکان از ۲ تا ۶ سال می‌توانند در کودکستان ثبت‌نام کنند.',
        ]);

        \App\Models\Faq::create([
            'question' => 'ساعات کاری کودکستان چیست؟',
            'answer' => 'کودکستان از شنبه تا پنج‌شنبه از ساعت ۷ صبح تا ۵ عصر باز است.',
        ]);

        \App\Models\Faq::create([
            'question' => 'آیا غذای کودکان در کودکستان تأمین می‌شود؟',
            'answer' => 'بله، غذای سالم و مقوی برای تمام کودکان تأمین می‌شود.',
        ]);

        \App\Models\Faq::create([
            'question' => 'هزینه ثبت‌نام چقدر است؟',
            'answer' => 'هزینه ثبت‌نام بسته به برنامه انتخابی متفاوت است. برای اطلاعات بیشتر با ما تماس بگیرید.',
        ]);

        \App\Models\Faq::create([
            'question' => 'آیا امکان ثبت‌نام ماهانه وجود دارد؟',
            'answer' => 'بله، ثبت‌نام ماهانه و سالانه امکان‌پذیر است.',
        ]);

        \App\Models\Faq::create([
            'question' => 'مربیان کودکستان چه تجربه‌ای دارند؟',
            'answer' => 'تمام مربیان دارای تجربه و مدارک معتبر در زمینه آموزش کودکان هستند.',
        ]);

        \App\Models\Faq::create([
            'question' => 'آیا امکان بازدید از کودکستان وجود دارد؟',
            'answer' => 'بله، با هماهنگی قبلی می‌توانید از کودکستان بازدید کنید.',
        ]);

        \App\Models\Faq::create([
            'question' => 'چه مدارکی برای ثبت‌نام لازم است؟',
            'answer' => 'کارت شناسایی کودک، گواهی سلامت پزشکی، و فرم ثبت‌نام تکمیل شده.',
        ]);
    }
}
