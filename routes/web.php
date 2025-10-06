<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CasoController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\ReaccionController;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    // Casos
    Route::get('/casos', function () {
        return Inertia::render('Casos');
    })->name('casos');

    Route::get('/casos/publicaciones', function () {
        return Inertia::render('CasosPublicaciones');
    })->name('casos.publicaciones');

    Route::get('/casos/lista', [CasoController::class, 'index'])->name('casos.lista');
    Route::post('/casos/crear', [CasoController::class, 'store'])->name('casos.crear');

    // Blog (posts) - nombres normalizados a blog.*
    Route::get('/blog', [PostController::class, 'index'])->name('blog.index');
    Route::get('/blog/create', [PostController::class, 'create'])->name('blog.create');
    Route::post('/blog', [PostController::class, 'store'])->name('blog.store');
    Route::get('/blog/{post}/edit', [PostController::class, 'edit'])->name('blog.edit');
    Route::put('/blog/{post}', [PostController::class, 'update'])->name('blog.update');
    Route::delete('/blog/{post}', [PostController::class, 'destroy'])->name('blog.destroy');

    // Comentarios y reacciones
    Route::post('/blog/{post}/comentarios', [ComentarioController::class, 'store'])->name('blog.comentarios.store');
    Route::post('/blog/{post}/reacciones', [ReaccionController::class, 'store'])->name('blog.reacciones.store');
});

require __DIR__.'/auth.php';