<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return $categories;
    }

    public function adminCreateNewCategory(Request $request)
    {
        $user = Auth::user();
        if($user->role === "admin") {
             $category = new Category();
             $category->name = $request->name;
             $category->available = true;
             $category->save();
             return response()->json([
                'message' => 'Categoria creata con successo'
             ], 200);
        } else {
            return response()->json([
                'message' => 'Not Authorized'
            ], 401);
        }
    }

    public function adminUpdateNewCategory(Request $request, $id)
    {
        $user = Auth::user();
        if($user->role === "admin") {
            $category = Category::where('id', $id)->first();
            $category->name = $request->name;
            $category->save();
            return response()->json([
                'message' => 'Categoria Modificata con successo'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Not Authorized'
            ], 401);
        }
    }

    public function adminDisableCategory($id)
    {
        $user = Auth::user();
        if($user->role === "admin") {
            $category = Category::where('id', $id)->first();
            $category->available = false;
            $category->save();
            return response()->json([
                'message' => 'Categoria Disabilitata con successo'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Not Authorized'
            ], 401);
        }
    }

    public function adminAvailableCategory($id)
    {
        $user = Auth::user();
        if($user->role === "admin") {
            $category = Category::where('id', $id)->first();
            $category->available = true;
            $category->save();
            return response()->json([
                'message' => 'Categoria Disabilitata con successo'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Not Authorized'
            ], 401);
        }
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
    public function store(StoreCategoryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
