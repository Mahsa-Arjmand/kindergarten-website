<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake('fa_IR')->name(),
            'position' => fake()->randomElement(['teacher', 'assistant_teacher', 'activity_coordinator', 'special_education_teacher']),
            'education' => fake()->randomElement(['bachelor', 'master', 'phd']),
            'specialization' => fake()->randomElement(['child_psychology', 'early_childhood_education', 'art_education', 'music_education', 'physical_education']),
            'experience' => fake()->text(),
            'bio' => fake()->text(),
            'image_path' => fake()->optional()->imageUrl(400, 400),
            'is_active' => fake()->boolean(80),
            'order' => fake()->numberBetween(0, 100),
        ];
    }
}
