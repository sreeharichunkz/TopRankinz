<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\ProfileUserMeta;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function userActivities()
    {

        $message = 'Login to see activities';
        $status = 204;
        $data = null;

        if (Auth::user()) {

            $user_id = Auth::user()->id;

            $profile = new Profile();

            $profile_id_array = $profile->where('in_trash', 'false')
                ->where('active_status', 'true')
                ->get()->pluck('id')->flatten();

            $profile_user_meta = new ProfileUserMeta();
            $profile_user_meta = $profile_user_meta
                ->where('user_id', $user_id)
                ->whereIn('profile_id', $profile_id_array)
                ->whereNot('like_status', 'nolike')
                ->get();

            if ($profile_user_meta->isNotEmpty()) {

                $data = [];
                $data['profile_like_count'] = $profile_user_meta->where('like_status', 'like')->count();
                $data['profile_dislike_count'] = $profile_user_meta->where('like_status', 'dislike')->count();
                $data['total_profile_rated'] = $data['profile_like_count'] + $data['profile_dislike_count'];
                $message = 'User activities data';
                $status = 200;

                if (!$data['total_profile_rated']) {
                    $message = 'No activities found';
                    $status = 204;
                    $data = null;
                }

            } else {
                $message = 'No activities found';
                $status = 204;
            }

        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'status' => $status,

        ]);
    }

    public function show()
    {

        $message = '';
        $status = 200;
        $success = false;
        $data = null;

        if (Auth::check()) {

            $user_id = Auth::user()->id;
            $user = new User();
            $user = $user->where('in_trash', 'false')->where('is_block', 'false')->find($user_id);

            if (is_null($user)) {

                $message = 'User not found';
                $status = 204;
            } else {
                $message = 'User Data';
                $status = 200;
            }
            $data = [
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'email_verified' => $user->email_verified_at ? true : false,
                'number' => $user->number,
            ];
            $success = true;

        } else {
            $message = 'Login to see user data';
            $status = 204;

        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $data,
            'status' => $status,

        ]);
    }

    public function update(Request $request)
    {

        if (Auth::check()) {

            $message = '';
            $status = 200;
            $success = true;
            $data = null;

            $user = Auth::user();

            if (Hash::check($request->current_password, $user->password)) {
                $this->validate($request, [
                    'name' => 'sometimes|required|string|max:255',
                    'username' => [
                        'sometimes', 'required', 'string', 'max:255', 'sometimes', 'required',
                        Rule::unique('users')->ignore($user),
                    ],
                    'number' => 'sometimes|required|string|max:20|nullable',
                    'email' => [
                        'sometimes', 'required', 'string', 'max:255', 'email',
                        Rule::unique('users')->ignore($user),
                    ],
                    'current_password' => 'required|string',
                ]);

                if ($request->has('name')) {
                    $user->name = $request->name;
                }
                if ($request->has('username')) {
                    $user->username = $request->username;
                }
                if ($request->has('number')) {
                    $user->number = $request->number;
                }
                if ($request->has('email')) {
                    $user->email = $request->email;
                }

                if ($user->save()) {
                    $message = 'User Updated Successfully';
                    $status = 200;
                    $data = [
                        'name' => $user->name,
                        'username' => $user->username,
                        'email' => $user->email,
                        'email_verified' => $user->email_verified_at ? true : false,
                        'number' => $user->number,
                    ];

                } else {
                    $message = 'Someting error occur';
                    $status = 500;
                    $success = false;
                }
            } else {
                $message = 'Incorrect Password';
                $status = 401;
                $success = false;
            }

            return response()->json([
                'success' => $success,
                'message' => $message,
                'data' => $data,
                'status' => $status,
            ]);
        }

        return response()->json(['Unauthorized']);

    }

}
