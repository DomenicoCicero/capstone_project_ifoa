<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'phone' => fake()->e164PhoneNumber(),
            'street' => fake()->address(),
            'civic_number' => fake()->buildingNumber(),
            'city' => fake()->city(),
            'postal_code' => fake()->postcode(),
            'user_id' => function () {
                return User::factory()->create()->id;
            },
        ];
    }
}
