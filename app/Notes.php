<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    //
    protected $fillable = ['id','title','content','created_user','updated_user'];
    protected $table = 'notes';
}
