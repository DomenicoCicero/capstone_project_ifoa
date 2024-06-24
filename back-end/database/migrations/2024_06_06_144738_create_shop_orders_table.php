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
        Schema::create('shop_orders', function (Blueprint $table) {
            $table->id();
            $table->decimal('total_price', 10, 2);
            $table->boolean('discounted')->default(false);
            $table->decimal('total_price_discounted', 10, 2)->nullable();
            $table->enum('payment_method', ['card', 'cash'])->default('card');
            $table->enum('delivery_method', ['home_delivery', 'store_pickup'])->default('home_delivery');
            $table->enum('delivery_status', ['scheduled', 'in_transit', 'delivered', 'cancelled'])->default('scheduled');
            $table->enum('status', ['pending', 'delivered', 'ready_in_store', 'completed', 'cancelled'])->default('pending');
            $table->enum('step', ['delivery_method_page', 'address_payment_page', 'payment_method_page', 'payment_page', 'completed' ])->default('delivery_method_page');
            $table->timestamps();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('address_id')->nullable()->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop_orders');
    }
};
