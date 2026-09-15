<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Gallery>
 */
class GalleryFactory extends Factory
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
            'description' => fake()->optional()->text(),
            'image_path' => fake()->imageUrl(1200, 800),
            'category' => fake()->randomElement(['environment', 'classes', 'activities', 'celebrations', 'trips']),
            'is_visible' => fake()->boolean(80),
            'order' => fake()->numberBetween(0, 100),
        ];
    }
}
