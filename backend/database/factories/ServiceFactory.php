<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->randomElement([
                'نگهداری و مراقبت',
                'برنامه‌های آموزشی',
                'آموزش زبان',
                'فعالیت‌های هنری',
                'فعالیت‌های ورزشی',
                'برنامه‌های خلاقانه',
                'جشن‌ها و مناسبت‌ها'
            ]),
            'description' => fake()->text(),
            'image_path' => fake()->optional()->imageUrl(800, 600),
            'is_active' => fake()->boolean(80),
            'order' => fake()->numberBetween(0, 100),
        ];
    }
}
