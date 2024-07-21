<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    public function sendPasswordResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users'],
        [
            "email.exists"=>"Email not exist"
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

       

        return $status === Password::RESET_LINK_SENT
                    ? response()->json(['message' => 'Reset link sent to your email'], 200)
                    : response()->json(['message' => 'Reset link sent to your email'], 200);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
                    ? response()->json(['message' => 'Password has been reset'], 200)
                    : response()->json(['message' => 'Failed to reset password | Try again'], 500);
    }
}
