<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    public function store(Request $request)
    {        
        $this->validate($request, [
            'title1' => 'required|string|max:255',
            'title2' => 'required|string|max:255',
            'title3' => 'required|string|max:255',
            'slide_number' => 'integer|',
            'bg_color' => 'string',
            'image' => 'image|mimes:jpeg,png,jpg,svg|max:5256',
        ]);

        $message = '';
        $status = 200;
        $success = true;

        $slider = new Slider();
        $slider->fill($request->all());

        if (isset($request->image)) {
            $relativePath = $request->file('image')->store('profile_images', 'public');
            $url = Storage::url($relativePath);

            $slider->image = $relativePath;
        }

        if ($slider->save()) {
            $message = 'Slide Created Successfully';
            $status = 201;

        } else {
            $message = 'Something error occur';
            $status = 500;
            $success = false;
        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $slider,
            'status' => $status,
            'base_path' => $url = $request->root() . '/storage',
        ]);

    }

    public function update(Request $request, $id)
    {

        $message = '';
        $status = 200;
        $success = true;

        $slider = Slider::find($id);

        if (is_null($slider)) {
            $message = 'No Slide found with this Id';
            $status = 204;
            $success = true;
        } else {

            $this->validate($request, [
                'title1' => 'string|max:255',
                'title2' => 'string|max:255',
                'title3' => 'string|max:255',
                'slide_number' => 'integer|',
                'bg_color' => 'string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:5256',
            ]);          
            
            $slider->fill($request->all());

            if (isset($request->image)) {
                if ($slider->image) { 
                    
                    Storage::disk('public')->delete($slider->image);
                }
                $relativePath = $request->file('image')->store('slider_images', 'public');                                

                $slider->image = $relativePath;
            }

            if ($slider->save()) {
                $message = 'Slide Updated Successfully';
                $status = 201;

            } else {
                $message = 'Something error occur';
                $status = 500;
                $success = false;
            }
        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $slider,
            'status' => $status,
            'base_path' => $request->root() . '/storage',
        ]);

    }

    public function index(Request $request)
    {

        $get_quantity = $request->get_quantity ?: 10;

        $slider = new Slider();

        $slider = $slider->where('in_trash','false')->paginate($get_quantity);
       
        $message = '';
        $status = 200;

        if ($slider->isNotEmpty()) {
            $message = 'Slider Data';
            $status = 200;
        } else {
            $message = 'No Slider Data available.';
            $status = 204;
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $slider,
            'status' => $status,
            'base_path' => $url = $request->root() . '/storage',

        ]);
    }

    public function show(Request $request,$id)
    {
       

        $slider = new Slider();

        $slider = $slider->where('in_trash','false')->find($id);
       
        $message = '';
        $status = 200;

        if (!is_null($slider)) {
            $message = 'Slide Data';
            $status = 200;
        } else {
            $message = 'No Slide found with this id.';
            $status = 204;
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $slider,
            'status' => $status,
            'base_path' => $url = $request->root() . '/storage',

        ]);
    }

    public function destroy(Request $request,$id)
    {
      
        $slider = new Slider();

        $slider = $slider->where('in_trash','false')->find($id);
       
        $message = '';
        $status = 200;

        if (!is_null($slider)) {

            $slider->in_trash = 'true';

            if ($slider->save()) {
                $message = 'Slide Deleted Successfully';                

            } else {
                $message = 'Something error occur';
                $status = 500;
                $success = false;
            }
                       
        } else {
            $message = 'No Slide found with this id.';
            $status = 204;
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $slider,
            'status' => $status,
            'base_path' => $url = $request->root() . '/storage',

        ]);
    }

    public function slider(Request $request)
    {
        

        $slider = new Slider();

        $slider = $slider->where('in_trash','false')
        ->where('in_slider','true')
        ->orderBy('slide_number','asc')
        ->get();
       
        $message = '';
        $status = 200;

        if ($slider->isNotEmpty()) {
            $message = 'Slider Data';
            $status = 200;
        } else {
            $message = 'No Slider Data available.';
            $status = 204;
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $slider,
            'status' => $status,
            'base_path' => $url = $request->root() . '/storage',

        ]);
    }
}
