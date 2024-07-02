<?php

namespace App\Http\Controllers;

use App\Models\ShopOrder;
use App\Http\Requests\StoreShopOrderRequest;
use App\Http\Requests\UpdateShopOrderRequest;
use App\Models\Address;
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

        $address = Address::where('user_id', $user_id)->first();
        $address_id = $address->id;

        if($shop_order_exist) {
            OrderItem::where('shop_order_id', $shop_order_exist->id)->delete();
            $shop_order_exist->delete();
        } 

            $shop_order = new ShopOrder();
            $shop_order->user_id = $user_id;
            $shop_order->total_price = $request->total_price;
            $shop_order->discounted = $request->discounted;
            $shop_order->total_price_discounted	= $request->total_price_discounted;
            $shop_order->address_id = $address_id;
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

    public function paymentMethod(Request $request)
    {
        $user_id = Auth::user()->id;
        $shop_order = ShopOrder::where('user_id', $user_id)->where('step', '<>', 'completed')->first();

        $shop_order->payment_method = $request->payment_method;
        $shop_order->save();

        if($request->payment_method === "card") {
            $shop_order->step = "payment_page";
            $shop_order->save();
            return response()->json([
                'message' => 'metodo di pagamento aggiunto',
                'next_step' => 'payment_page',
            ]);
        }

        if($request->payment_method === "cash") {
            $shop_order->step = "completed";
            $shop_order->save();
            return response()->json([
                'message' => 'metodo di pagamento aggiunto',
                'next_step' => 'completed',
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

    public function regainShopOrder() 
    {
        $user_id = Auth::user()->id;
        $shop_order = ShopOrder::where('user_id', $user_id)->where('step', '<>', 'completed')->first();

        $shop_order_step = $shop_order->step;

        return response()->json([
            'message' => 'Ordine ripreso',
            'next_step' => $shop_order_step,
        ]);
    }

    public function getOrders()
    {
        $user_id = Auth::user()->id;
        $shop_orders = ShopOrder::with('order_items', 'order_items.product')->where('user_id', $user_id)->where('step', '=', 'completed')->get()->all();

        return response()->json([
            'data' => $shop_orders,
        ], 200);
    }

    public function adminGetShopOrderPending()
    {
        $user = Auth::user();
        if($user->role === "admin") {
            $shop_orders = ShopOrder::with('order_items', 'order_items.product', 'user')->where('status', '<>', 'completed')->get()->all();

            return response()->json([
                'data' => $shop_orders,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Unauthorized',
            ]);
        }
    }

    public function adminGetShopOrderCompleted()
    {
        $user = Auth::user();
        if($user->role === "admin") {
            $shop_orders = ShopOrder::with('order_items', 'order_items.product', 'user')->where('status', '=', 'completed')->get()->all();

            return response()->json([
                'data' => $shop_orders,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Unauthorized',
            ]);
        }
    }

    public function adminEditStatusDelivered($id)
    {
        $user = Auth::user();
        if($user->role === "admin") {
            $shop_order = ShopOrder::where('id', $id)->first();
            $shop_order->status = 'delivered';
            $shop_order->save();

            return response()->json([
                'message' => "Status prodotto Spedito",
            ], 200);
        } else {
            return response()->json([
                'message' => 'Unauthorized',
            ]);
        }
    }

    public function adminEditStatusReadyInStore($id)
    {
        $user = Auth::user();
        if($user->role === "admin") {
            $shop_order = ShopOrder::where('id', $id)->first();
            $shop_order->status = 'ready_in_store';
            $shop_order->save();

            return response()->json([
                'message' => "Status prodotto Pronto In Negozio",
            ], 200);
        } else {
            return response()->json([
                'message' => 'Unauthorized',
            ]);
        }
    }

    public function adminEditStatusCompleted($id)
    {
        $user = Auth::user();
        if($user->role === "admin") {
            $shop_order = ShopOrder::where('id', $id)->first();
            $shop_order->status = 'completed';
            $shop_order->save();

            return response()->json([
                'message' => "Status prodotto Completato",
            ], 200);
        } else {
            return response()->json([
                'message' => 'Unauthorized',
            ]);
        }
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
