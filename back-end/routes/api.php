<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/products", [ProductController::class, 'getProductsHomePage']);
Route::get("/categories", [CategoryController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get("/products-page", [ProductController::class, 'getProductsProductsPage']);
    Route::get("/products/category/{categoryId}", [ProductController::class, 'getProductsByCategory']);
    Route::get("/products/search", [ProductController::class, 'searchProducts']);
    Route::get("/products/{productId}", [ProductController::class, 'getProductDetails']);
    Route::post("/add-prefer-product/{productId}", [ProductController::class, 'addPreferProduct']);
    Route::delete("/remove-prefer-product/{productId}", [ProductController::class, 'removeProduct']);
    Route::get("/prefer-product", [ProductController::class, 'getPreferProducts']);

    // Route::post('/send-email', [ContactController::class, 'sendEmail']);

});
