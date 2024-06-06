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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', 10, 2);
            $table->enum('payment_method', ['card', 'cash']);
            $table->enum('payment_status', ['pending', 'completed', 'failed'])->default('pending');
            $table->string('transition_id')->nullable();
            $table->timestamps();
            $table->foreignId('shop_order_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
