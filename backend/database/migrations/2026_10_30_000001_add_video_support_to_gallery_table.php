<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('gallery', function (Blueprint $table) {
            $table->string('image_path')->nullable()->change();
            $table->string('video_path')->nullable()->after('image_path');
            $table->boolean('is_hero')->default(false)->after('is_visible');
        });
    }

    public function down(): void
    {
        DB::table('gallery')->whereNull('image_path')->update(['image_path' => '']);

        Schema::table('gallery', function (Blueprint $table) {
            $table->dropColumn(['video_path', 'is_hero']);
            $table->string('image_path')->nullable(false)->change();
        });
    }
};
