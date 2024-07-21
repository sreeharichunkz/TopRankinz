<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, $id)
    {

        $comment = new Profile();
        $comment = $comment->where('in_trash', 'false')->find($id);

        $message = 'Somethig error occur';
        $status = 204;
        $success = false;
        $data = null;

        if (is_null($comment)) {

            $message = 'No profile found with this id';

        } else {
            $this->validate($request, [
                'comment' => 'required|string|max:65500',
            ]);
            $comment = new Comment();
            $comment->fill($request->all());
            $comment->profile_id = $id;
            $comment->user_id = Auth::user()->id;

            if ($comment->save()) {
                $message = 'Comment add successfully';
                $status = 201;
                $success = true;
                $data = $comment;
            }

        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $data,
            'status' => $status,
        ]);
    }

    public function reply(Request $request, $id, $commentid)
    {

        $comment = new Profile();
        $comment = $comment->where('in_trash', 'false')->find($id);

        $message = 'Somethig error occur';
        $status = 204;
        $success = false;
        $data = null;

        if (is_null($comment)) {

            $message = 'No profile found with this id';

        } else {
            $this->validate($request, [
                'comment' => 'required|string|max:65500',
            ]);
            $comment = new Comment();
            $comment->fill($request->all());
            $comment->profile_id = $id;
            $comment->user_id = Auth::user()->id;
            $comment->parent_comment_id = $commentid;

            if ($comment->save()) {
                $message = 'Comment Reply add successfully';
                $status = 201;
                $success = true;
                $data = $comment;
            }

        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $data,
            'status' => $status,
        ]);
    }

    public function destroy($profileid, $id)
    {
        $message = '';
        $status = 200;
        $success = true;
        $data = null;

        if (Auth::user()->isAdmin()) {

            $comment = new Comment();
            $comment = $comment->where('in_trash', 'false')->find($id);

            if (is_null($comment)) {
                $message = 'No Comment found with this Id';
                $status = 204;
                $success = true;
            } else {

                $comment->in_trash = 'true';

                if ($comment->save()) {
                    $message = 'Comment Deleted Successfully';
                    $status = 200;
                    $data = $comment;
                } else {
                    $message = 'Someting error occur';
                    $status = 500;
                    $success = false;
                }
            }

        } else if (Auth::user()->isNotAdmin()) {

            $profile = new Profile();
            $profile = $profile->where('in_trash', 'false')->find($profileid);

            if (is_null($profile)) {
                $message = 'No Profile found with this Id';
                $status = 204;
                $success = true;
            } else {

                $comment = new Comment();
                $comment = $comment->where('in_trash', 'false')
                        ->where('profile_id',$profileid)
                        ->where('user_id',Auth::user()->id)
                        ->find($id);

                if (is_null($comment)) {
                    $message = 'No Comment found with this Id';
                    $status = 204;
                    $success = true;
                } else {

                    

                    $comment->in_trash = 'true';

                    if ($comment->save()) {
                        $message = 'Comment Deleted Successfully';
                        $status = 200;
                        $data = $comment;
                    } else {
                        $message = 'Someting error occur';
                        $status = 500;
                        $success = false;
                    }
                }
            }
        }
        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $comment,
            'status' => $status,
        ]);
    }
}
