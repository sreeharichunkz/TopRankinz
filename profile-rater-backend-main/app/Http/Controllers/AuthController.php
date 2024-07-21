<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        
        $this->validate($request,[
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'number' => 'string|max:20|unique:users|nullable',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required|string|min:8',
        ]);
        
          
        $user = new User();

        $user->fill($request->all());
        $user->password=Hash::make($request->password);
        $user->role=2;

        $user->save();

        return response()->json(['message' => 'User registered successfully']);
    }

    public function login(Request $request)
    {
        $this->validate($request,[
            'username' => 'required|string',
            'password' => 'required|string',
        ]);
        

        $user = User::where('username', $request->username)->where('is_block','false')->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        

        return response()->json(['access_token' => $token,'user'=>$user]);
    }
    public function adminLogin(Request $request)
    {
        $this->validate($request,[
            'username' => 'required|string',
            'password' => 'required|string',
        ]);
        

        $user = User::where('username', $request->username)->first();

        if (! $user || ! Hash::check($request->password, $user->password) || $user->role !=1) {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        

        return response()->json(['admin_access_token' => $token,'user'=>$user]);
    }

    public function user(Request $request)
    {
        return $request->user();
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
