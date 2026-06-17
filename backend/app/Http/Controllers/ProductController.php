<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(
            Product::latest()->get()->map(function ($p) {
                return [
                    'id' => $p->id,
                    'name' => $p->name,
                    'price' => $p->price,
                    'description' => $p->description,
                    'image_url' => $p->image
                        ? Storage::disk('s3')->url($p->image)
                        : null,
                ];
            })
        );
    }

    public function show($id)
    {
        $p = Product::findOrFail($id);

        return response()->json([
            'id' => $p->id,
            'name' => $p->name,
            'price' => $p->price,
            'description' => $p->description,
            'image_url' => $p->image
                ? Storage::disk('s3')->url($p->image)
                : null,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required',
            'image' => 'required|image|max:2048',
        ]);

        $path = $request->file('image')->store('products', 's3');

        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'image' => $path,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        if ($product->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $product->update([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
        ]);

        return response()->json($product);
    }

    public function destroy($id, Request $request)
    {
        $product = Product::findOrFail($id);

        if ($product->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        if ($product->image) {
            Storage::disk('s3')->delete($product->image);
        }

        $product->delete();

        return response()->json(['message' => 'deleted']);
    }
}