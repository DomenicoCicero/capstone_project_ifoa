<?php

namespace App\Http\Controllers;

use App\Models\ShopOrder;
use App\Http\Requests\StoreShopOrderRequest;
use App\Http\Requests\UpdateShopOrderRequest;
use App\Models\CartItem;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShopOrderController extends Controller
{

    public function checkout(Request $request)
    {
        $user_id = Auth::user()->id;
        $shop_order_exist = ShopOrder::where('user_id', $user_id)->where('step', '<>', 'completed')->first();
        if($shop_order_exist) {
            OrderItem::where('shop_order_id', $shop_order_exist->id)->delete();
            $shop_order_exist->delete();
        } 

            $shop_order = new ShopOrder();
            $shop_order->user_id = $user_id;
            $shop_order->total_price = $request->total_price;
            $shop_order->discounted = $request->discounted;
            $shop_order->total_price_discounted	= $request->total_price_discounted;
            $shop_order->save();

            $cart_items = $request->cart_items;

            foreach ($cart_items as $item) {
                CartItem::where('id', $item['id'])->delete();
        
                $order_item = new OrderItem();
                $order_item->shop_order_id = $shop_order->id;
                $order_item->product_id = $item['product_id'];
                $order_item->quantity = $item['quantity'];
                $order_item->price = $item['product']['price'];
                $order_item->discounted = $item['product']['discounted'];
                $order_item->price_discounted = $item['product']['price_discounted'];
                $order_item->save();
            }

            return response()->json([
                'message' => 'nuovo ordine creato',
                'next_step' => 'delivery_method_page',
            ]);
    }

    public function deliveryMethod(Request $request)
    {
        $user_id = Auth::user()->id;
        $shop_order = ShopOrder::where('user_id', $user_id)->where('step', '<>', 'completed')->first();

        $shop_order->delivery_method = $request->delivery_method;
        $shop_order->save();

        if($request->delivery_method === "home_delivery") {
            $shop_order->step = "address_payment_page";
            $shop_order->save();
            return response()->json([
                'message' => 'metodo di spedizione aggiunto',
                'next_step' => 'address_payment_page',
            ]);
        }

        if($request->delivery_method === "store_pickup") {
            $shop_order->step = "payment_method_page";
            $shop_order->save();
            return response()->json([
                'message' => 'metodo di spedizione aggiunto',
                'next_step' => 'payment_method_page',
            ]);
        }
    }

    public function changeStepShopOrder(Request $request)
    {
        $user_id = Auth::user()->id;
        $shop_order = ShopOrder::where('user_id', $user_id)->where('step', '<>', 'completed')->first();
        $shop_order->step = $request->step;
        $shop_order->save();

        return response()->json([
            'message' => 'step successivo aggiornato',
        ]);
    }

    /**
     * Display a listing of the resource.
     */
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
    public function store(StoreShopOrderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ShopOrder $shopOrder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ShopOrder $shopOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShopOrderRequest $request, ShopOrder $shopOrder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShopOrder $shopOrder)
    {
        //
    }
}
