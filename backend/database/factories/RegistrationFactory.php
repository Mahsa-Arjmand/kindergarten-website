<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Registration>
 */
class RegistrationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'child_first_name' => fake('fa_IR')->firstName(),
            'child_last_name' => fake('fa_IR')->lastName(),
            'child_birth_date' => fake()->dateTimeBetween('-6 years', '-2 years'),
            'child_gender' => fake()->randomElement(['male', 'female']),
            'age_group' => fake()->randomElement(['2-3', '3-4', '4-5', '5-6']),
            'child_notes' => fake()->optional()->text(),
            'parent_first_name' => fake('fa_IR')->firstName(),
            'parent_last_name' => fake('fa_IR')->lastName(),
            'parent_relation' => fake()->randomElement(['father', 'mother', 'guardian']),
            'phone' => fake()->phoneNumber(),
            'phone_secondary' => fake()->optional()->phoneNumber(),
            'email' => fake()->optional()->email(),
            'preferred_program' => fake()->randomElement(['full_day', 'half_day_morning', 'half_day_afternoon']),
            'preferred_time' => fake()->optional()->dateTime(),
            'notes' => fake()->optional()->text(),
            'status' => fake()->randomElement(['new', 'reviewing', 'approved', 'rejected']),
        ];
    }
}
