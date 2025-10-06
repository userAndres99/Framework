<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //

    protected $fillable = ['user_id', 'titulo', 'contenido', 'imagen'];


    public function user(){
        return $this -> belongsTo(User::class);
    }



    public function comentarios(){
        return $this -> hasMany(Comentario::class);
    }


    public function reacciones(){
        return $this -> hasMany(Reaccion::class);
    }
}