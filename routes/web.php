<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CasoController;
use App\Models\Caso;

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
    Route::get('/casos', function () {
        return Inertia::render('Casos'); // Esto renderiza tu componente React
    })->name('casos');

    Route::get('/casos/lista', [CasoController::class, 'index'])->name('casos.lista');
    Route::post('/casos/crear', [CasoController::class, 'store'])->name('casos.crear');
});





Route::middleware(['auth']) -> group(function(){
    Route::get('/blog', [PostController::class, 'index'])->name('posts.index'); //listado de post
    Route::get('/blog/create', [PostController::class, 'create'])->name('posts.create');// formulario crear
    Route::post('/blog', [PostController::class, 'store'])->name('posts.store'); //guardar post
    Route::get('/blog/{post}/edit', [PostController::class, 'edit'])->name('posts.edit'); //editar post
    Route::put('/blog/{post}', [PostController::class, 'update'])->name('posts.update');//actualizar post
    Route::delete('/blog/{post}', [PostController::class, 'destroy'])-> name('posts.destroy'); // borrar post

    //Comentarios
    Route::post('/blog/{post}/comentarios', [ComentarioController::class, 'store'])->name('comentarios.store');

    // Reacciones
    Route::post('/blog/{post}/reacciones', [ReaccionController::class, 'store'])->name('reacciones.store');
});
require __DIR__.'/auth.php';