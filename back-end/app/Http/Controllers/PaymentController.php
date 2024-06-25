<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Charge;

class PaymentController extends Controller
{
    public function charge(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $token = $request->input('token');
        $amount = $request->input('amount');

        $charge = Charge::create([
            'amount' => $amount,
            'currency' => 'usd',
            'description' => 'Test Charge',
            'source' => $token,
        ]);

        return response()->json(['status' => 'Payment Successful']);
    }
}