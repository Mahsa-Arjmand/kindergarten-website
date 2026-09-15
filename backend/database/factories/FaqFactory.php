<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Faq>
 */
class FaqFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $questions = [
            'کودکستان برای چه گروه سنی است؟',
            'ساعات فعالیت چگونه است؟',
            'روند ثبت‌نام چگونه است؟',
            'چه برنامه‌هایی برگزار می‌شود؟',
            'آیا امکان بازدید از کودکستان وجود دارد؟',
            'چگونه می‌توان برای همکاری درخواست داد؟',
            'هزینه ثبت‌نام چقدر است؟',
            'آیا غذا ارائه می‌شود؟',
        ];

        return [
            'question' => fake()->randomElement($questions),
            'answer' => fake()->text(),
            'is_active' => fake()->boolean(80),
            'order' => fake()->numberBetween(0, 100),
        ];
    }
}
