<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function showAllUser(Request $request)
    {

        $get_quantity = $request->get_quantity ?: 10;

        $user = new User();
        $user = $user->where('in_trash', 'false')
            ->whereNot('role',1)
            ->paginate($get_quantity);

        $message = '';
        $status = 200;

        if ($user->isNotEmpty()) {
            $message = 'User Data';            
        } else {
            $message = 'No User Data available.';
            $status = 204;
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $user,
            'status' => $status,
            'base_path' => $url = $request->root() . '/storage',

        ]);
    }

    public function showUser(Request $request,$userid)
    {
        

        $user = new User();
        $user = $user->where('in_trash', 'false')
            ->whereNot('role',1)
            ->find($userid);

        $message = '';
        $status = 200;

        if (!is_null($user)) {
            $message = 'User Data';            
        } else {
            $message = 'User not found';
            $status = 204;
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $user,
            'status' => $status,
            'base_path' => $url = $request->root() . '/storage',

        ]);
    }

    public function updateUser(Request $request, $userid){

        $user = new User();
        $user = $user->where('in_trash', 'false')
            ->whereNot('role',1)
            ->find($userid);

        $message = '';
        $status = 200;
        $success = false;

        if (!is_null($user)) {

            $this->validate($request,[
                'name' => 'string|max:255',
                'username' => 'string|max:255|unique:users',   
                'is_block'=>'string|in:true,false'                          
            ]);

            $user->name = $request->name?:$user->name;
            $user->username = $request->username?:$user->username;
            $user->is_block = $request->is_block?:$user->is_block;

            if($user->save()){
                $message = 'User Data Update successfully';    
                $success = true;        
            }
            else{
                $message = 'Something error occur';            
                $status = 204;
            }
        } else {
            $message = 'User not found';
            $status = 204;
            $success = true;  
        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $user,
            'status' => $status,
            'base_path' => $url = $request->root() . '/storage',

        ]);
    }

    public function destroyUser(Request $request, $userid){

        $user = new User();
        $user = $user->where('in_trash', 'false')
            ->whereNot('role',1)
            ->find($userid);

        $message = '';
        $status = 200;
        $success = false;

        if (!is_null($user)) {

            $user->in_trash = 'true';

            if($user->save()){
                $message = 'User Deleted successfully';    
                $success = true;        
            }
            else{
                $message = 'Something error occur';            
                $status = 204;
            }
        } else {
            $message = 'User not found';
            $status = 204;
            $success = true;  
        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $user,
            'status' => $status,
            'base_path' => $url = $request->root() . '/storage',

        ]);
    }

    public function dashboard(){
        $profile = new Profile();
        $profile = $profile->where('in_trash','false')->get()->count();

        $user = new User();
        $user = $user->where('in_trash','false')
        ->whereNot('role',1)
        ->get()->count();

        return response()->json([
            'success' => true,
            'message' => 'Profile and User count',
            'data' => ['profile_count'=>$profile,'user_count'=>$user],
            'status' => 200,
            

        ]);
    }
}
