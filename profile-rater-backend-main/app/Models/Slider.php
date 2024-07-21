<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $table = 'home_slider';
    protected $fillable = ['title1','title2','title3','bg_color','slide_number','in_slider'];
    protected $hidden = ['created_at','updated_at'];
}
