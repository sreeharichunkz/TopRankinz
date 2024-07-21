<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function index(Request $request)
    {

        $get_quantity = $request->get_quantity ?: 10;

        $profile = new Profile();

        if (Auth::check() && Auth::user()->isAdmin()) {

            $profile = $profile->where('in_trash', 'false')
                ->with('awardRecognition')
                ->with('comment.replies')
                ->withCount('profileLike', 'profileDislike')
                ->orderBy('id', 'desc')
                ->paginate($get_quantity);

            $profile->getCollection()->transform(function ($p) {

                $p->rating = $p->rating();
                $p->rating_count = $p->ratingCount();
                return $p;

            });

        } else {
            $profile = $profile->where('in_trash', 'false')
                ->where('active_status', 'true')
                ->withCount('profileLike', 'profileDislike')
                ->orderBy('profile_like_count', 'desc')
                ->paginate($get_quantity);

            $profile->getCollection()->transform(function ($p) {

                $p->rating = $p->rating();
                $p->rating_count = $p->ratingCount();
                return $p;

            });

        }

        $message = '';
        $status = 200;

        if ($profile->isNotEmpty()) {

            $message = 'Profile Data';
            $status = 200;
        } else {
            $message = 'No Profile Data available.';
            $status = 204;
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $profile,
            'status' => $status,
            'base_path' => $url = $request->root() . '/storage',

        ]);
    }

    public function filter(Request $request)
    {

        $this->validate($request, [
            'state' => 'nullable|string',
            'district' => 'nullable|string',
            'industry' => 'nullable|string',
            'order_by' => 'nullable|string|in:name,profile_like_count,profile_dislike_count',
            'order_by_dir' => 'nullable|string|in:asc,desc',
        ]);
        $get_quantity = $request->get_quantity ?: 10;
        $state = $request->state ?? '';
        $district = $request->district ?? '';
        $industry = $request->industry ?? '';

        $profile = new Profile();

        if (Auth::check() && Auth::user()->isAdmin()) {

            $profile = $profile->where('in_trash', 'false')
                ->whereRaw('LOWER(state) LIKE ?', [strtolower($state) . '%'])
                ->whereRaw('LOWER(district) LIKE ?', [strtolower($district) . '%'])
                ->whereRaw('LOWER(industry) LIKE ?', [strtolower($industry) . '%'])
                ->with('awardRecognition')
                ->with('comment.replies')
                ->withCount('profileLike', 'profileDislike')
                // ->orderBy('id', 'desc')
                ->orderBy($request->order_by ?? 'id', $request->order_by_dir ?? 'desc')
                ->paginate($get_quantity);

            $profile->getCollection()->transform(function ($p) {

                $p->rating = $p->rating();
                $p->rating_count = $p->ratingCount();
                return $p;

            });

        } else {

            $profile = $profile->where('in_trash', 'false')
                ->where('active_status', 'true')
                ->whereRaw('LOWER(state) LIKE ?', [strtolower($state) . '%'])
                ->whereRaw('LOWER(district) LIKE ?', [strtolower($district) . '%'])
                ->whereRaw('LOWER(industry) LIKE ?', [strtolower($industry) . '%'])
                ->withCount('profileLike', 'profileDislike')
                ->orderBy($request->order_by ?? 'profile_like_count', $request->order_by_dir ?? 'asc')
                ->paginate($get_quantity);

            $profile->getCollection()->transform(function ($p) {

                $p->rating = $p->rating();
                $p->rating_count = $p->ratingCount();
                return $p;

            });

        }

        $message = '';
        $status = 200;

        if ($profile->isNotEmpty()) {

            $message = 'Profile Data';
            $status = 200;
        } else {
            $message = 'No Profile Data available.';
            $status = 204;
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $profile,
            'status' => $status,
            'base_path' => $url = $request->root() . '/storage',

        ]);
    }

    public function show(Request $request, $id)
    {
        $profile = new Profile();

        if (Auth::user()) {
            if (Auth::user()->isNotAdmin()) {
                $profile = $profile->where('in_trash', 'false')
                    ->where('active_status', 'true')
                    ->where('id', $id)
                    ->with('profileUserMeta')
                    ->with('awardRecognition')
                    ->with(['comment' => ['replies', 'user']])
                    ->withCount('profileLike', 'profileDislike')->get();

            } else if (Auth::user()->isAdmin()) {
                $profile = $profile->where('in_trash', 'false')
                    ->where('id', $id)
                    ->with('profileUserMeta')
                    ->with('awardRecognition')
                    ->with(['comment' => ['replies', 'user']])
                    ->withCount('profileLike', 'profileDislike')->get();
            }

        } else {
            $profile = $profile
                ->where('in_trash', 'false')
                ->where('active_status', 'true')
                ->where('id', $id)
                ->with('awardRecognition')
                ->with(['comment' => ['replies', 'user']])
                ->withCount('profileLike', 'profileDislike')
                ->get();
        }

        $message = '';
        $status = 200;

        if ($profile->isNotEmpty()) {
            $message = 'Profile Data';
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
            'base_path' => $url = $request->root() . '/storage',

        ]);
    }

    public function store(Request $request)
    {

        $this->validate($request, [
            'name' => 'required|string',
            'industry' => 'required|string',
            'about' => 'required|string|max:2000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'age' => 'nullable|string|max:3',
            'height' => 'nullable|string|max:20',
            'net_worth' => 'nullable|string|max:10',
            'marital_status' => 'nullable|string|max:50',
            'children' => 'nullable|string|max:50',
            'education' => 'nullable|string|max:100',
            'citizenship' => 'nullable|string|max:50',
            'residence' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:150',
            'district' => 'nullable|string|max:150',
            'career_status' => 'nullable|string|max:20',
            'active_status' => 'string|in:true,false',

        ]);

        $message = '';
        $status = 200;
        $success = true;

        $profile = new Profile();
        $profile->fill($request->all());
        $url = null;
        if (isset($request->image)) {
            $relativePath = $request->file('image')->store('profile_images', 'public');
            $url = Storage::url($relativePath);

            $profile->image = $relativePath;
        }

        if ($profile->save()) {
            $message = 'Profile Created Successfully';
            $status = 201;
            $profile->image = $url;
        } else {
            $message = 'Something error occur';
            $status = 500;
            $success = false;
        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $profile,
            'status' => $status,
        ]);
    }

    public function update(Request $request, $id)
    {

        $message = '';
        $status = 200;
        $success = true;

        $profile = Profile::find($id);

        if (is_null($profile)) {
            $message = 'No Profile found with this Id';
            $status = 204;
            $success = true;
        } else {

            $this->validate($request, [
                'name' => 'string',
                'industry' => 'string',
                'about' => 'string|max:2000',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
                'age' => 'nullable|string|max:3',
                'height' => 'nullable|string|max:20',
                'net_worth' => 'nullable|string|max:10',
                'marital_status' => 'nullable|string|max:50',
                'children' => 'nullable|string|max:50',
                'education' => 'nullable|string|max:100',
                'citizenship' => 'nullable|string|max:50',
                'residence' => 'nullable|string|max:100',
                'state' => 'nullable|string|max:150',
                'district' => 'nullable|string|max:150',
                'career_status' => 'nullable|string|max:20',
                'active_status' => 'string|in:true,false',
            ]);

            $profile->fill($request->all());
            $url = null;
            if (!is_null($request->image)) {

                if ($profile->image) {
                    Storage::disk('public')->delete($profile->image);
                }

                $relativePath = $request->file('image')->store('profile_images', 'public');
                $url = Storage::url($relativePath);

                $profile->image = $relativePath;
            }

            if ($profile->save()) {
                $message = 'Profile Updated Successfully';
                $status = 200;

            } else {
                $message = 'Someting error occur';
                $status = 500;
                $success = false;
            }
        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $profile,
            'status' => $status,
        ]);
    }
    public function destroy($id)
    {
        $message = '';
        $status = 200;
        $success = true;

        $profile = new Profile();
        $profile = $profile->where('in_trash', 'false')->find($id);

        if (is_null($profile)) {
            $message = 'No Profile found with this Id';
            $status = 204;
            $success = true;
        } else {

            $profile->in_trash = 'true';

            if ($profile->save()) {
                $message = 'Profile Deleted Successfully';
                $status = 200;
            } else {
                $message = 'Someting error occur';
                $status = 500;
                $success = false;
            }
        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $profile,
            'status' => $status,
        ]);
    }

    public function showFilters()
    {
        $profile = new Profile();

        $states = $profile->where('in_trash', 'false')
            ->select('state')
            ->distinct()
            ->get()
            ->pluck('state');

        // return $states;
        $filters = [];
        $filters_states = [];
        foreach ($states as $state) {
            $district = $profile->where('in_trash', 'false')
                ->where('state', $state)
                ->select('district')
                ->distinct()
                ->get()
                ->pluck('district');

            $filters_states[$state] = $district;
        }
        $industry = $profile->where('in_trash', 'false')
            ->select('industry')
            ->distinct()
            ->get()
            ->pluck('industry');

        $filters['state'] = $filters_states;
        $filters['industry'] = $industry;

        return $filters;

    }
}
