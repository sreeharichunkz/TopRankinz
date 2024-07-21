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
        Schema::create('profile', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('industry');
            $table->string('about',2000)->nullable();
            $table->string('image')->nullable();        
            $table->string('age',3)->nullable();        
            $table->string('height',20)->nullable();        
            $table->string('net_worth',10)->nullable();        
            $table->string('marital_status',50)->nullable();        
            $table->string('children',50)->nullable();        
            $table->string('education',100)->nullable();        
            $table->string('citizenship',50)->nullable();        
            $table->string('residence',100)->nullable();        
            $table->string('state',150)->nullable();        
            $table->string('district',150)->nullable();        
            $table->string('career_status',20)->nullable();        
            $table->enum('active_status',['true','false'])->default('true');                                         
            $table->enum('in_trash',['true','false'])->default('false');          
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile');
    }
};
