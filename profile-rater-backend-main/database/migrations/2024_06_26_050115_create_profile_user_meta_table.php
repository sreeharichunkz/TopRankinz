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
        Schema::create('profile_user_meta', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('profile_id');
            $table->foreign('profile_id')->references('id')->on('profile');
            $table->enum('like_status',['like','dislike','nolike'])->default('nolike');
            $table->unsignedSmallInteger('rating')->nullable();
            $table->enum('in_trash',['true','false'])->default('false');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile_user_meta');
    }
};
