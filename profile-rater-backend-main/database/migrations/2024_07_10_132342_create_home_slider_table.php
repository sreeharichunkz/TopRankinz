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
        Schema::create('home_slider', function (Blueprint $table) {
            $table->id();
            $table->string('title1');
            $table->string('title2');
            $table->string('title3');
            $table->string('image');
            $table->string('bg_color',20)->default('#ffffff');
            $table->unsignedSmallInteger('slide_number')->nullable();
            $table->enum('in_slider',['true','false'])->default('false');  
            $table->enum('in_trash',['true','false'])->default('false');  
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_slider');
    }
};
