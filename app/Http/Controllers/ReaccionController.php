<?php

namespace App\Http\Controllers;

use App\Models\Reaccion;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReaccionController extends Controller
{
   // ReaccionController.php
public function store(Post $post)
{
    $userId = auth()->id();

    $reaccion = $post->reacciones()->where('user_id', $userId)->first();

    if ($reaccion) {
        $reaccion->delete();
        $liked = false;
    } else {
        $post->reacciones()->create([
            'user_id' => $userId,
            'tipo' => 'like',
        ]);
        $liked = true;
    }

    return response()->json([
        'liked' => $liked,
        'total' => $post->reacciones()->count(),
    ]);
}

}
