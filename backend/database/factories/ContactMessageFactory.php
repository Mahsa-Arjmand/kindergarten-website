<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ContactMessage>
 */
class ContactMessageFactory extends Factory
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
            'phone' => fake()->phoneNumber(),
            'email' => fake()->optional()->email(),
            'subject' => fake()->randomElement(['registration', 'programs', 'employment', 'general']),
            'message' => fake()->text(),
            'is_read' => fake()->boolean(),
        ];
    }
}
