<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user();

        return response()->json([
            'user' => $user,
            'avatar_url' => $user->avatar
                ? Storage::disk('s3')->url($user->avatar)
                : null,
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'bio' => 'nullable|string',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->filled('name')){
            $user->name = $validated['name'];
        }

        if ($request->has('bio')) {
            $user->bio = $validated['bio'];
        }

        if ($request->hasFile('avatar')) {

            if ($user->avatar) {
                Storage::disk('s3')->delete($user->avatar);
            }

            $path = Storage::disk('s3')->put(
                'avatars',
                $request->file('avatar'),
                'public'
            );

            $user->avatar = $path;
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
            'avatar_url' => $user->avatar
                ? Storage::disk('s3')->url($user->avatar)
                : null,
        ]);
    }
}