<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user_ids = User::all()->pluck('id')->all();
        for ($i=1; $i < count($user_ids); $i++) { 
            Cart::create([
                'user_id' => $user_ids[$i],
            ]);
        }
    }
}
