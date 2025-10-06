<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with(['user', 'comentarios.user', 'reacciones.user'])
            ->latest()
            ->get()
            ->map(function ($p) {
                $p->imagen_url = $p->imagen ? Storage::url($p->imagen) : null;
                return $p;
            });

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
            'imagen' => 'nullable|image|max:5120', // 5 MB
        ]);

        $imagenPath = null;
        if ($request->hasFile('imagen')) {
            $imagenPath = $request->file('imagen')->store('posts', 'public');
        }

        $post = Post::create([
            'user_id' => $request->user()->id,
            'titulo' => $request->titulo,
            'contenido' => $request->contenido,
            'imagen' => $imagenPath,
        ]);

        return redirect()->route('blog.index')->with('success', 'Publicación creada correctamente');
    }

    public function show(Post $post)
    {
        $post->load(['user', 'comentarios.user', 'reacciones.user']);
        $post->imagen_url = $post->imagen ? Storage::url($post->imagen) : null;
        return Inertia::render('Blog/Show', ['post' => $post]);
    }

    public function edit(Post $post)
    {
        $this->authorize('update', $post);
        $post->imagen_url = $post->imagen ? Storage::url($post->imagen) : null;
        return Inertia::render('Blog/Edit', ['post' => $post]);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
            'imagen' => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('imagen')) {
            if ($post->imagen) {
                Storage::disk('public')->delete($post->imagen);
            }
            $post->imagen = $request->file('imagen')->store('posts', 'public');
        }

        $post->titulo = $request->titulo;
        $post->contenido = $request->contenido;
        $post->save();

        return redirect()->route('blog.index')->with('success', 'Publicación actualizada');
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);

        if ($post->imagen) {
            Storage::disk('public')->delete($post->imagen);
        }

        $post->delete();

        return redirect()->route('blog.index')->with('success', 'Publicación eliminada');
    }
}