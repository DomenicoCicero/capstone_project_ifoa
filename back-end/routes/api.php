<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopOrderController;
use App\Http\Controllers\UserController;
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
    Route::post("/update_profile_img", [UserController::class, 'updateProfileImg']);
    Route::get("/addresses", [AddressController::class, 'getAddress']);
    Route::post("/addresses/update", [AddressController::class, 'updateAddress']);
    Route::post("/cart-item/update", [CartItemController::class, 'updateCartItem']);
    Route::get("/cart", [CartItemController::class, 'getCart']);
    Route::get("/cart-quantity", [CartController::class, 'getCartQuantity']);
    Route::delete("/cart-item/delete/{productId}", [CartItemController::class, 'deleteCartItem']);
    Route::post("/cart-item/update/cart-page", [CartItemController::class, 'updateCartItemCartPage']);
    Route::post("/checkout", [ShopOrderController::class, 'checkout']);
    Route::post("/delivery_method", [ShopOrderController::class, 'deliveryMethod']);
    Route::post("/change_step_shop_order", [ShopOrderController::class, 'changeStepShopOrder']);
    Route::post("/payment_method", [ShopOrderController::class, 'paymentMethod']);
    Route::post('/charge', [PaymentController::class, 'charge']);
    Route::get('/regain_shop_order', [ShopOrderController::class, 'regainShopOrder']);
    Route::get('/orders', [ShopOrderController::class, 'getOrders']);
    
    Route::post('/admin/created-category', [CategoryController::class, 'adminCreateNewCategory']);
    Route::put('/admin/update-category/{id}', [CategoryController::class, 'adminUpdateNewCategory']);
    Route::put('/admin/disable-category/{id}', [CategoryController::class, 'adminDisableCategory']);
    Route::put('/admin/available-category/{id}', [CategoryController::class, 'adminAvailableCategory']);

    // Route::post('/send-email', [ContactController::class, 'sendEmail']);

});
