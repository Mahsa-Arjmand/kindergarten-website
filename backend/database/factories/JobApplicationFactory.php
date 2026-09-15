<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobApplication>
 */
class JobApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake('fa_IR')->firstName(),
            'last_name' => fake('fa_IR')->lastName(),
            'phone' => fake()->phoneNumber(),
            'age' => fake()->numberBetween(22, 50),
            'education' => fake()->randomElement(['diploma', 'associate', 'bachelor', 'master', 'phd']),
            'field_of_study' => fake()->randomElement(['child_psychology', 'education', 'art', 'music', 'physical_education']),
            'work_experience' => fake()->optional()->text(),
            'skills' => fake()->optional()->text(),
            'notes' => fake()->optional()->text(),
            'cv_path' => fake()->optional()->filePath(),
            'status' => fake()->randomElement(['new', 'reviewing', 'interview', 'accepted', 'rejected']),
        ];
    }
}
