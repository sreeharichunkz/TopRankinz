<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use App\Models\ProfileUserMeta;

class ProfileUserMetaController extends Controller
{

    public function storeLike(Request $request, $id)
    {

        $profile = new Profile();
        $profile = $profile->where('in_trash', 'false')->find($id);

        $message = '';
        $status = 204;
        $success = false;
        $data = null;

        if (is_null($profile)) {

            $message = 'No profile found with this id';
            $status = 204;
            $success = false;

        } else {

            $this->validate($request, [
                'like_status' => 'required|string|in:like,dislike,nolike',
            ]);

            $message = '';
            $status = 200;
            $success = true;
            $current_user_id = $request->user()->id;

            $profileLike = ProfileUserMeta::all();
            $profileLike = $profileLike->where('user_id', $current_user_id)->where('profile_id', $id);

            if ($profileLike->isEmpty()) {

                $profileLike = new ProfileUserMeta();
                $profileLike->like_status = $request->like_status;
                $profileLike->user_id = $current_user_id;
                $profileLike->profile_id = $id;
            } else if ($profileLike->isNotEmpty()) {

                $profileLike = ProfileUserMeta::find($profileLike->first()->id);
                $profileLike->like_status = $request->like_status;
            }

            if ($profileLike->save()) {
                $message = "Profile $request->like_status Successfully";
                $status = 201;
                $data = $profileLike;
            } else {
                $message = 'Someting error occur';
                $status = 500;
                $success = false;
            }
        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $data,
            'status' => $status,
        ]);
    }

    public function storeRating(Request $request, $id)
    {

        $profile = new Profile();
        $profile = $profile->where('in_trash', 'false')->find($id);

        $message = '';
        $status = 204;
        $success = false;
        $data = null;

        if (is_null($profile)) {

            $message = 'No profile found with this id';
            $status = 204;
            $success = false;

        } else {

            $this->validate($request, [
                'rating' => 'required|integer|max:5|min:0',
            ]);

            $message = '';
            $status = 204;
            $success = true;
            $current_user_id = $request->user()->id;

            $profileRating = ProfileUserMeta::all();
            $profileRating = $profileRating->where('user_id', $current_user_id)->where('profile_id', $id);

            if ($profileRating->isEmpty()) {

                $profileRating = new ProfileUserMeta();
                $profileRating->rating = $request->rating;
                $profileRating->user_id = $current_user_id;
                $profileRating->profile_id = $id;
            } else if ($profileRating->isNotEmpty()) {

                $profileRating = ProfileUserMeta::find($profileRating->first()->id);
                $profileRating->rating = $request->rating;
            }

            if ($profileRating->save()) {
                $message = "Profile Rated Successfully";
                $status = 201;
                $data = $profileRating;
            } else {
                $message = 'Someting error occur';
                $status = 500;
                $success = false;
            }
        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $data,
            'status' => $status,
        ]);
    }

}
