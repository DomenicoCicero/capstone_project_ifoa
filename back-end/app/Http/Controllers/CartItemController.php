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

     public function getCart()
     {
        $user_id = Auth::user()->id;

        $cart = Cart::where('user_id', $user_id)->first();
        $cart_id = $cart->id;

        $cart_items = CartItem::with('product', 'product.category')->where('cart_id', $cart_id)->get()->all();

        if(count($cart_items) === 0) {
            return response()->json(['message' => 'Nessun prodotto nel carrello']);
        } else {
            $total_price = 0;
            $discounted = 0;

            for ($i=0; $i < count($cart_items); $i++) { 
                $total_price += $cart_items[$i]->product->price * $cart_items[$i]->quantity;
                if($cart_items[$i]->product->discounted === 1) {
                    $discounted += ($cart_items[$i]->product->price - $cart_items[$i]->product->price_discounted) * $cart_items[$i]->quantity;
                }
            }

            return response()->json([
                'data' => $cart_items,
                'total_price' => round($total_price, 2),
                'discounted' => round($discounted, 2),
                'total_discounted' => round($total_price - $discounted, 2)
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
