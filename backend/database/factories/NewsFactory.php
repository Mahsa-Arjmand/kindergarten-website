<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'content' => fake()->text(),
            'image_path' => fake()->optional()->imageUrl(1200, 600),
            'publish_date' => fake()->dateTimeBetween('-6 months', 'now'),
            'status' => fake()->randomElement(['draft', 'published']),
        ];
    }
}
