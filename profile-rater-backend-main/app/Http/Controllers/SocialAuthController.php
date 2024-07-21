<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function getAuthUrl($provider)
    {
        $url = Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();
        return response()->json(['url' => $url]);
    }

    public function handleProviderCallback($provider)
    {
        $socialUser = Socialite::driver($provider)->stateless()->user();

        // Check if the user already exists
        // $user = User::where('email', $socialUser->getEmail())->first();

        // if ($user) {
        //     // Update user details if necessary
        //     $user->update([
        //         'name' => $socialUser->getName(),
        //         'provider_id' => $socialUser->getId(),
        //         'image' => $socialUser->getAvatar(),
        //     ]);
        // } else {
        //     // Create a new user
        //     $user = User::create([
        //         'name' => $socialUser->getName(),
        //         'email' => $socialUser->getEmail(),
        //         'provider' => $provider,
        //         'provider_id' => $socialUser->getId(),
        //         'image' => $socialUser->getAvatar(),
        //         'role'=>3,
        //         'password' => bcrypt(Str::random(16)), // You can set a random password or null
        //     ]);
        // }

        $username = $this->generateUniqueUsernameFromEmail($socialUser->getEmail());

        $user = User::updateOrCreate(
            [
                'provider_id' => $socialUser->getId(),
                'provider' => $provider,
            ],
            [
                'name' => $socialUser->getName(),
                'email' => $socialUser->getEmail(),
                'username' => $username,
                'avatar' => $socialUser->getAvatar(),
                'role'=>3,
                'password' => bcrypt(Str::random(16)), 
            ]
        );

       

        
        Auth::login($user, true);

        // Redirect to the frontend application with token
        $token = $user->createToken('access_token')->accessToken;
        $forntend_url = env(FRONTEND_URL);
        return redirect()->to("$forntend_url/auth/callback?token={$token}");
    }

    private function generateUniqueUsernameFromEmail($email)
    {
        $baseName = Str::before($email, '@'); // Extract part before '@'
        $slug = Str::slug($baseName); // Convert to a slug
        $username = $slug;
        $counter = 1;

        // Ensure uniqueness
        while (User::where('username', $username)->exists()) {
            $username = $slug . $counter;
            $counter++;
        }

        return $username;
    }
}
