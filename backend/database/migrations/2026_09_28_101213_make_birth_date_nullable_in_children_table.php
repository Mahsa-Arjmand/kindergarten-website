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
        Schema::table('children', function (Blueprint $table) {
            $table->date('birth_date')->nullable()->change();
            $table->enum('gender', ['male', 'female'])->nullable()->change();
            $table->string('parent_phone', 20)->nullable()->change();
            $table->date('enrollment_date')->nullable()->change();
            $table->enum('status', ['active', 'graduated', 'withdrawn'])->nullable()->change();
            $table->text('notes')->nullable()->change();
            $table->string('photo_path')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('children', function (Blueprint $table) {
            $table->date('birth_date')->nullable(false)->change();
            $table->enum('gender', ['male', 'female'])->nullable(false)->change();
            $table->string('parent_phone', 20)->nullable(false)->change();
            $table->date('enrollment_date')->nullable(false)->change();
            $table->enum('status', ['active', 'graduated', 'withdrawn'])->nullable(false)->change();
            $table->text('notes')->nullable(false)->change();
            $table->string('photo_path')->nullable(false)->change();
        });
    }
};
