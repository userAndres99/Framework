<?php

namespace App\Http\Controllers;

use App\Models\Caso;
use Illuminate\Http\Request;

class CasoController extends Controller
{
    public function index()
    {
        $casos = Caso::with('usuario')->get();
        return response()->json($casos);
    }

    public function store(Request $request)
    {
        // Validación
        $request->validate([
            'Descripcion' => 'required|string',
            'Latitud' => 'required|numeric',
            'Longitud' => 'required|numeric',
        ]);

        // Crear caso con el usuario autenticado
        $caso = Caso::create([
            'Descripcion' => $request->Descripcion,
            'Latitud' => $request->Latitud,
            'Longitud' => $request->Longitud,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($caso, 201);
    }

    public function show($id)
    {
        $caso = Caso::with('usuario')->findOrFail($id);
        return response()->json($caso);
    }
}
