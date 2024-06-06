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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('phone', 20)->nullable();
            $table->string('street')->nullable();
            $table->string('civic_number', 6)->nullable();
            $table->string('city', 50)->nullable();
            $table->string('postal_code', 10)->nullable();
            $table->foreignId('user_id')->constrained();
            $table->unique('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
