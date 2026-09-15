<?php

namespace Database\Seeders;

use App\Models\JobApplication;
use Illuminate\Database\Seeder;

class JobApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 5; $i++) {
            \App\Models\JobApplication::create([
                'first_name' => "متقاضی {$i}",
                'last_name' => "خانواده {$i}",
                'phone' => "091234567" . ($i % 10),
                'age' => rand(25, 40),
                'education' => 'لیسانس',
                'field_of_study' => 'مربیگری کودک',
                'work_experience' => '۳ سال تجربه',
                'skills' => 'صبر، خلاقیت، ارتباط با کودکان',
                'notes' => null,
                'cv_path' => null,
                'status' => 'new',
            ]);
        }
    }
}
