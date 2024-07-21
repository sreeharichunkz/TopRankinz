<?php

namespace App\Models;


use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class ProfileUserMeta extends Model
{
    protected $table='profile_user_meta';
    protected $fillable=['like_status','rating'];
    protected $hidden=['created_at','updated_at'];
    
   
    
}
