<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Http\Requests\StoreAddressRequest;
use App\Http\Requests\UpdateAddressRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAddress()
    {
        $user_id = Auth::user()->id;

        $address = Address::where('user_id', $user_id)->first();

        if($address) {
            return response()->json(['address' => $address], 200);
        } else {
            return response()->json(['address' => 'nessun idirizzo salvato']);
        }
    }

    public function updateAddress(Request $request)
    {
        $user_id = Auth::user()->id;

        $validatedData = $request->validate([
            'phone' => 'required|string|max:20',
            'street' => 'required|string|max:255',
            'civic_number' => 'required|string|max:15',
            'city' => 'required|string|max:50',
            'postal_code' => 'required|string|max:10',
        ]);

        $address = Address::where('user_id', $user_id)->first();

        if($address) {
            $address->phone = $validatedData['phone'];
            $address->street = $validatedData['street'];
            $address->civic_number = $validatedData['civic_number'];
            $address->city = $validatedData['city'];
            $address->postal_code = $validatedData['postal_code'];

            $address->save();
        } else {
            $new_address = new Address();
            $new_address->user_id = $user_id;
            $new_address->phone = $validatedData['phone'];
            $new_address->street = $validatedData['street'];
            $new_address->civic_number = $validatedData['civic_number'];
            $new_address->city = $validatedData['city'];
            $new_address->postal_code = $validatedData['postal_code'];

            $new_address->save();
        }

        return response()->json(['message' => 'Address updated successfully']);
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
    public function store(StoreAddressRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Address $address)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Address $address)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAddressRequest $request, Address $address)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Address $address)
    {
        //
    }
}
