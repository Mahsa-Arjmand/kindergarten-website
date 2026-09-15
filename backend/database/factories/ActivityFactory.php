<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
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
                'نقاشی و هنر',
                'موسیقی',
                'زبان انگلیسی',
                'ورزش',
                'بازی‌های خلاقانه',
                'فعالیت‌های علمی',
                'جشن‌ها',
                'اردوها'
            ]),
            'description' => fake()->text(),
            'image_path' => fake()->optional()->imageUrl(800, 600),
            'age_group' => fake()->randomElement(['2-3', '3-4', '4-5', '5-6', 'all']),
            'is_active' => fake()->boolean(80),
            'order' => fake()->numberBetween(0, 100),
        ];
    }
}
