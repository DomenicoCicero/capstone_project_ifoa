<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Http\Requests\StoreCartItemRequest;
use App\Http\Requests\UpdateCartItemRequest;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function updateCartItem(Request $request)
     {
        $user_id = Auth::user()->id;

        $cart = Cart::where('user_id', $user_id)->first();
        $cart_id = $cart->id;

        $quantity = $request->quantity;
        $product_id = $request->product_id;

        $cart_item = CartItem::where('cart_id', $cart_id)->where('product_id', $product_id)->first();
        $product = Product::where('id', $product_id)->first();
        $stock_quantity = $product->stock_quantity;

        if($cart_item) {
            $cart_item->quantity = $cart_item->quantity + $quantity;
            if($cart_item->quantity > $stock_quantity) {
                return response()->json(['message' => 'Quantità non disponibile in negozio'], 200);
            } else {
                $cart_item->save();
            }
        } else {

            $cartItem = new CartItem();
            $cartItem->cart_id = $cart_id;
            $cartItem->quantity = $quantity;
            $cartItem->product_id = $product_id;

            if($cartItem->quantity > $stock_quantity) {
                return response()->json(['message' => 'Quantità non disponibile in negozio'], 200);
            } else {
                $cartItem->save();
            }
        }
        return response()->json(['message' => 'Prodotto aggiunto al carrello']);
     }

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCartItemRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CartItem $cartItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CartItem $cartItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartItemRequest $request, CartItem $cartItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CartItem $cartItem)
    {
        //
    }
}
