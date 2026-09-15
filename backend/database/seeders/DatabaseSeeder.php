<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user directly
        \App\Models\User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);

        // Seed sample data
        $this->call([
            TeacherSeeder::class,
            ServiceSeeder::class,
            ActivitySeeder::class,
            GallerySeeder::class,
            NewsSeeder::class,
            FaqSeeder::class,
            RegistrationSeeder::class,
            JobApplicationSeeder::class,
            ContactMessageSeeder::class,
        ]);
    }
}
