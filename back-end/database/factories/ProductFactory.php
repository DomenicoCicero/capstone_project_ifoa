<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = fake()->randomFloat(2, 1, 60);
        $discounted = fake()->boolean();
        $price_discounted = $discounted ? fake()->randomFloat(2, 0.5, $price) : null;

        $category_ids = Category::all()->pluck('id')->all();

        return [
            'name' => fake()->sentence($nbWords = rand(2, 3), $variableNbWords = true),
            'description' => fake()->paragraph(),
            'price' => $price,
            'discounted' => $discounted,
            'price_discounted' => $price_discounted,
            'stock_quantity' => rand(0, 50),
            'ingredients' => fake()->sentence($nbWords = rand(2, 6), $variableNbWords = true),
            'image_url' => fake()->imageUrl(),
            'category_id' => fake()->randomElement($category_ids),
        ];
    }
}
