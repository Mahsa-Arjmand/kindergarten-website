<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('registration_id')->unique();
            
            // Child information
            $table->string('child_first_name');
            $table->string('child_last_name');
            $table->date('child_birth_date');
            $table->enum('child_gender', ['male', 'female']);
            $table->string('age_group');
            $table->text('child_notes')->nullable();
            
            // Parent information
            $table->string('parent_first_name');
            $table->string('parent_last_name');
            $table->string('parent_relation');
            $table->string('phone');
            $table->string('phone_secondary')->nullable();
            $table->string('email')->nullable();
            
            // Registration information
            $table->string('preferred_program');
            $table->string('preferred_time')->nullable();
            $table->text('notes')->nullable();
            
            // Status
            $table->enum('status', ['new', 'reviewing', 'approved', 'rejected'])->default('new');
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
