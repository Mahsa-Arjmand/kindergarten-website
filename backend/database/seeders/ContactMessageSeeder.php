<?php

namespace Database\Seeders;

use App\Models\ContactMessage;
use Illuminate\Database\Seeder;

class ContactMessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 8; $i++) {
            \App\Models\ContactMessage::create([
                'name' => "پیام‌دهنده {$i}",
                'phone' => "091234567" . ($i % 10),
                'email' => "contact{$i}@example.com",
                'subject' => "موضوع {$i}",
                'message' => "محتوای پیام نمونه {$i}",
                'is_read' => false,
            ]);
        }
    }
}
