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
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            
            // Personal information
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone');
            $table->integer('age');
            $table->string('education');
            $table->string('field_of_study');
            $table->text('work_experience')->nullable();
            $table->text('skills')->nullable();
            $table->text('notes')->nullable();
            
            // CV file
            $table->string('cv_path')->nullable();
            
            // Status
            $table->enum('status', ['new', 'reviewing', 'interview', 'accepted', 'rejected'])->default('new');
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
