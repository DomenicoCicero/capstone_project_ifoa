<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function getProductsHomePage()
    {
        try {
            $user_id = Auth::id();
            $products = Product::with('category')->get();
    
            if ($user_id) {
                $user_prefer_product_ids = DB::table('product_user')
                    ->where('user_id', $user_id)
                    ->pluck('product_id')
                    ->toArray();
    
                return response()->json([
                    'data' => $products,
                    'preferProductIdArr' => $user_prefer_product_ids,
                ], 200);
            } else {
                return response()->json([
                    'data' => $products,
                    'preferProductIdArr' => [],
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getProductsProductsPage()
    {
    try {
        $user_id = Auth::id();
        $products = Product::with('category')->paginate(20);

        $user_prefer_product_ids = DB::table('product_user')
        ->where('user_id', $user_id)
        ->pluck('product_id')
        ->toArray();

        return response()->json([
            'data' => $products,
            'preferProductIdArr' => $user_prefer_product_ids,
        ], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }

    public function getProductsByCategory($categoryId)
    {
        $categoryId = intval($categoryId);

        $products = Product::where('category_id', $categoryId)->with('category')->paginate(20);
    
        return response()->json($products);
    }

    public function searchProducts(Request $request)
    {
        $query = $request->input('q');
        $products = Product::where('name', 'LIKE', "%$query%")->with('category')->paginate(20);
        return response()->json($products);
    }

    public function getProductDetails($productId)
    {
        $user_id = Auth::user()->id;
        $product = Product::where('id', $productId)->with('category')->get();

        if (count($product) === 0) {
            return response()->json(['message' => 'Product not found'], 404);
        } else {
        $isPrefer = DB::table('product_user')
        ->where('user_id', $user_id)
        ->where('product_id', $productId)
        ->exists();

        return response()->json([
            'data' => $product,
            'is_prefer' => $isPrefer,
        ], 200);
    }
    }

    public function addPreferProduct($productId)
    {
        $user_id = Auth::user()->id;
        $product_id = $productId;

        DB::table('product_user')->insert([
            'user_id' => $user_id,
            'product_id' => $product_id,
        ]);

        return response()->json([
            'message' => 'prodotto aggiunto con successo ai preferiti',
        ], 200);
    }

    public function removeProduct($productId)
    {
        $user_id = Auth::user()->id;
        $product_id = $productId;

        DB::table('product_user')
        ->where('user_id', $user_id)
        ->where('product_id', $product_id)
        ->delete();

        return response()->json([
            'message' => 'prodotto eliminato con successo dai preferiti',
        ], 200);
    }

    public function getPreferProducts()
    {
        $user_id = Auth::id();

        $products = DB::table('product_user')
            ->where('product_user.user_id', '=', $user_id)
            ->join('products', 'product_user.product_id', '=', 'products.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->select(
                'products.id as product_id', 'products.name as product_name', 'products.description', 'products.price',
                'products.discounted', 'products.price_discounted', 'products.stock_quantity', 'products.ingredients',
                'products.image_url', 'products.category_id', 'categories.id as category_id', 'categories.name as category_name'
            )
            ->get();
    
        $formattedProducts = $products->map(function ($product) {
            return [
                'id' => $product->product_id,
                'name' => $product->product_name,
                'description' => $product->description,
                'price' => $product->price,
                'discounted' => $product->discounted,
                'price_discounted' => $product->price_discounted,
                'stock_quantity' => $product->stock_quantity,
                'ingredients' => $product->ingredients,
                'image_url' => $product->image_url,
                'category_id' => $product->category_id,
                'category' => [
                    'id' => $product->category_id,
                    'name' => $product->category_name
                ]
            ];
        });

        $user_prefer_product_ids = DB::table('product_user')
        ->where('user_id', $user_id)
        ->pluck('product_id')
        ->toArray();

        return response()->json([
            'data' => $formattedProducts,
            'preferProductIdArr' => $user_prefer_product_ids
        ], 200);
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
    public function store(StoreProductRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
