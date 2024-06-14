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
        $products = Product::with('category')->get();
        return $products;
    }

    public function getProductsProductsPage()
    {
        $products = Product::with('category')->paginate(20);
        return response()->json($products);
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
        $product = Product::where('id', $productId)->with('category')->get();

        return response()->json($product);
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

    public function getPreferProducts()
    {
        $user_id = Auth::user()->id;

        $products = DB::table('product_user')
            ->where('product_user.user_id', '=', $user_id)
            ->join('products', 'product_user.product_id', '=', 'products.id')
            ->get();

        return response()->json([
            'products' => $products,
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
