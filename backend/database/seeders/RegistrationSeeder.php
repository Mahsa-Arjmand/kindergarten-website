<?php

namespace Database\Seeders;

use App\Models\Registration;
use Illuminate\Database\Seeder;

class RegistrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            \App\Models\Registration::create([
                'registration_id' => 'REG' . str_pad($i, 6, '0', STR_PAD_LEFT),
                'child_first_name' => "کودک {$i}",
                'child_last_name' => "خانواده {$i}",
                'child_birth_date' => now()->subYears(rand(3, 6))->toDateString(),
                'child_gender' => rand(0, 1) ? 'male' : 'female',
                'age_group' => rand(3, 6) . ' سال',
                'child_notes' => null,
                'parent_first_name' => "والد {$i}",
                'parent_last_name' => "خانواده {$i}",
                'parent_relation' => 'پدر',
                'phone' => "0912345678" . ($i % 10),
                'phone_secondary' => null,
                'email' => "parent{$i}@example.com",
                'preferred_program' => 'آموزش پیش‌دبستانی',
                'preferred_time' => 'صبح',
                'notes' => null,
                'status' => 'new',
            ]);
        }
    }
}
