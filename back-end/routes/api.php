<?php

use App\Http\Controllers\CategoryController;
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

});
