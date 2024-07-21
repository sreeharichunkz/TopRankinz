<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use App\Models\AwardRecognition;
use Illuminate\Support\Facades\Storage;

class AwardRecognitionController extends Controller
{
   
    public function show(Request $request, $id)
    {
        $profile = new Profile();

        if ($request->user()) {
            $profile = $profile->where('in_trash', 'false')
                ->where('active_status', 'true')
                ->where('id', $id)                
                ->with('awardRecognition')                
                ->get()
                ->pluck('awardRecognition')->flatten();

        } else {
            $profile = $profile
            ->where('in_trash', 'false')
            ->where('id', $id)
            ->with('awardRecognition')            
            ->get()
            ->pluck('awardRecognition')->flatten();
        }

        $message = '';
        $status = 200;

        if ($profile->isNotEmpty()) {
            $message = 'Profile`s Award & Recognition Data';
            $status = 200;
        } else {
            $message = 'No Profile Data Found with this id';
            $status = 204;
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $profile,
            'status' => $status,
            'base_path' => $url = $request->root().'/storage',

        ]);
    }
    public function store(Request $request,$profileid)
    {


        $profile = new Profile();
        $profile = $profile->where('in_trash', 'false')->find($profileid);

        $message = '';
        $status = 204;
        $success = false;
        $data = null;

        if (is_null($profile)) {

            $message = 'No profile found with this id';           
        }
        else{

            $this->validate($request, [
    
                'name' => 'required|string',
                'date' => 'string',
                'image' => 'nullable|image|mimes:jpeg,jpg,png,svg|max:1024',
            ]);
    
            $message = 'Something error occur';            
               
            $awardrecognition = new AwardRecognition();
    
            $awardrecognition->fill($request->all());
            $awardrecognition->profile_id = $profileid;

            if(isset($request->image)){

                $relativePath = $request->file('image')->store('profile_images','public');
                $url = Storage::url($relativePath);

                $awardrecognition->image = $relativePath;

            }            
                
            if ($awardrecognition->save()) {
                $message = 'Award & Recognition created successfully';
                $status = 201;
                $success = true;
                $data = $awardrecognition;
            }
        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $data,
            'status' => $status,

        ]);

    }

    public function update(Request $request,$profileid,$id)
    {


        $profile = new Profile();
        $profile = $profile->where('in_trash', 'false')->find($profileid);

        $message = '';
        $status = 204;
        $success = false;
        $data = null;

        if (is_null($profile)) {

            $message = 'No profile found with this id';           
        }
        else{

            $awardrecognition = new AwardRecognition();            
            $awardrecognition = $awardrecognition->where('in_trash', 'false')
            ->where('profile_id',$profileid)        
            ->find($id);

            if (is_null($profile)) {

                $message = 'No Award & Recognition found with this id';           
            }
            else{

                $this->validate($request, [
        
                    'name' => 'string',
                    'date' => 'string',
                    'image' => 'nullable|image|mimes:jpeg,jpg,png,svg|max:1024',
                ]);
        
                $message = 'Something error occur';            
                           
                $awardrecognition->fill($request->all());
                $awardrecognition->profile_id = $profileid;
    
                if(isset($request->image)){
    
                    $relativePath = $request->file('image')->store('profile_images','public');
                    $url = Storage::url($relativePath);
    
                    $awardrecognition->image = $relativePath;    
                }            
                    
                if ($awardrecognition->save()) {
                    $message = 'Award & Recognition Updated successfully';
                    $status = 201;
                    $success = true;
                    $data = $awardrecognition;
                }
            }

        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $data,
            'status' => $status,

        ]);

    }

    public function destroy($profileid, $id){

        $profile = new Profile();
        $profile = $profile->where('in_trash', 'false')->find($profileid);

        $message = '';
        $status = 204;
        $success = false;
        $data = null;
        

        if (is_null($profile)) {

            $message = 'No profile found with this id';                   

        }
        else{

            $awardrecognition = new AwardRecognition();
            
            $awardrecognition = $awardrecognition->where('in_trash', 'false')
            ->where('profile_id',$profileid)
            ->find($id);

            if(is_null($awardrecognition)){
                $message = 'No Award & Recognition Record found with this id';                        
            }
            else{
                $awardrecognition->in_trash = 'true';

                if($awardrecognition->save()){
                    $message = 'Award & Recognition Record deleted successfully';  
                    $status = 200;
                    $success = true;  
                    $data = $awardrecognition;                    
                }
                else{
                    $message = 'Something error occur';                        
                }
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
