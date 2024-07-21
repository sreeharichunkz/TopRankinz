<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Profile extends Model
{
    use HasFactory;
    protected $table = 'profile';

    protected $fillable = [
        'name',
        'industry',
        'about',
        'active_status',
        'age',
        'height',
        'net_worth',
        'marital_status',
        'children',
        'education',
        'citizenship',
        'residence',
        'state',
        'district',
        'career_status'
    ];
    protected $hidden = ['in_trash', 'created_at', 'updated_at'];

    public function profileUserMeta(): HasMany
    {
        return $this->hasMany(ProfileUserMeta::class)->where('user_id', Auth::user()->id)->where('in_trash', 'false');
    }

    public function profileLike(): HasMany
    {
        return $this->hasMany(ProfileUserMeta::class)->where('like_status', 'like')->where('in_trash', 'false');
    }

    public function profileDislike(): HasMany
    {
        return $this->hasMany(ProfileUserMeta::class)->where('like_status', 'dislike')->where('in_trash', 'false');
    }

    public function awardRecognition(): HasMany
    {
        return $this->hasMany(AwardRecognition::class)->where('in_trash', 'false')->orderBy('created_at','desc');

    }

    public function comment(): HasMany
    {
        return $this->hasMany(Comment::class)->where('in_trash', 'false')->where('parent_comment_id',null);

    }

    public function rating()
    {        
        
        $rating= DB::table('profile_user_meta')
        ->select('rating', DB::raw('count(*) as total'))
        ->where('profile_id', $this->id)
        ->where('in_trash', 'false')
        ->groupBy('rating')
        ->orderByDesc('total')
        ->first();

        if($rating){
            return $rating->rating;
        }


    }

    public function ratingCount()
    {        
        return 
        DB::table('profile_user_meta')
        ->select('rating', DB::raw('count(*) as total'))
        ->where('profile_id', $this->id)
        ->where('in_trash', 'false')
        ->count();
    }


    
}
