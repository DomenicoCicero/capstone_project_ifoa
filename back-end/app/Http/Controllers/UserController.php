<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    public function updateProfileImg(Request $request)
    {
        $request->validate([
            'profile_img' => ['required', 'image', 'max:1024']
        ]);

        $user = Auth::user();

        if($user->profile_img) {
            Storage::delete($user->profile_img);
        }

        $file_path = Storage::put('', $request['profile_img']);

        $user->profile_img = $file_path;
        
        try {
            // Utilizza una query di aggiornamento diretta
            User::where('id', $user->id)
                ->update(['profile_img' => $file_path]);

            return response()->json(['profile_img' => $file_path], 200);
        } catch (\Exception $e) {
            Log::error('Error updating profile image: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to update profile image'], 500);
        }
    }
}
