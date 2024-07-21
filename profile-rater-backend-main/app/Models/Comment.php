<?php

namespace App\Models;


use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
   protected $table = 'comment';
   protected $fillable = ['comment','parent_comment_id'];


   public function user():BelongsTo
   {
      if(Auth::check() && Auth::user()->isAdmin()){

         return $this->belongsTo(User::class);
      }
      else{

         return $this->belongsTo(User::class)->select('id', 'username');
      }
   }

   public function profile():BelongsTo
   {
       return $this->belongsTo(Profile::class);
   }

   public function replies():HasMany
   {
       return $this->hasMany(Comment::class, 'parent_comment_id')->with('user');
   }
}
