<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caso extends Model
{
    //

    use  HasFactory;


    protected $fillable = ['Descripcion', 'Longitud', 'Latitud','user_id'];


    public function usuario(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
