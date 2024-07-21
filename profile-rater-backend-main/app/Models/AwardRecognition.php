<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class AwardRecognition extends Model
{
    protected $table = 'profile_award_recognition';
    protected $fillable = ['name','date'];
    protected $hidden = ['created_at', 'updated_at'];    

}
