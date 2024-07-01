<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function getCartQuantity()
     {
        $user_id = Auth::user()->id;

        if(Auth::user()->role !== "admin") {
        $cart = Cart::where('user_id', $user_id)->first();
        $cart_id = $cart->id;

        $cart_items = CartItem::where('cart_id', $cart_id)->get()->all();

        $quantity = 0;

        for ($i=0; $i < count($cart_items); $i++) { 
            $quantity += $cart_items[$i]->quantity;
        }

        return response()->json([
            'quantity' => $quantity,
        ]);
    } else {
        return response()->json([
            'quantity' => 0,
        ]);
    }
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
    public function store(StoreCartRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
