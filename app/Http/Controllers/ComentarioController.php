<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ComentarioController extends Controller
{
    public function store(Request $request, Post $post)
{
    $request->validate([
        'contenido' => 'required|string|max:255',
    ]);

    $comentario = $post->comentarios()->create([
        'user_id' => auth()->id(),
        'contenido' => $request->contenido,
    ]);

    return response()->json([
        'comentario' => $comentario->load('user'),
    ]);
}


    public function destroy(Comentario $comentario)
    {
        $this->authorize('delete', $comentario);
        $comentario->delete();
        return redirect()->back();
    }
}
