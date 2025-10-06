<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with(['user', 'comentarios.user', 'reacciones.user'])->latest()->get();
        return Inertia::render('Blog/Index', ['posts' => $posts]);
    }

    public function create()
    {
        return Inertia::render('Blog/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
        ]);

        Post::create([
            'user_id' => $request->user()->id,
            'titulo' => $request->titulo,
            'contenido' => $request->contenido,
        ]);

        return redirect()->route('blog.index')->with('success', 'Publicación creada correctamente');
    }

    public function show(Post $post)
    {
        $post->load(['user', 'comentarios.user', 'reacciones.user']);
        return Inertia::render('Blog/Show', ['post' => $post]);
    }

    public function edit(Post $post)
    {
        $this->authorize('update', $post);
        return Inertia::render('Blog/Edit', ['post' => $post]);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
        ]);

        $post->update($request->only('titulo', 'contenido'));

        return redirect()->route('blog.index')->with('success', 'Publicación actualizada');
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();
        return redirect()->route('blog.index')->with('success', 'Publicación eliminada');
    }
}