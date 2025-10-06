<?php

namespace App\Http\Controllers;

use App\Models\Caso;
use Illuminate\Http\Request;

class CasoController extends Controller
{
    public function index()
    {
        $casos = Caso::with('usuario')->orderBy('created_at', 'desc')->get();
        return response()->json($casos);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'Descripcion' => 'required|string',
            'Latitud' => 'required|numeric',
            'Longitud' => 'required|numeric',
        ]);

        $data['user_id'] = $request->user()->id;

        $caso = Caso::create([
            'Descripcion' => $data['Descripcion'],
            'Latitud' => $data['Latitud'],
            'Longitud' => $data['Longitud'],
            'user_id' => $data['user_id'],
        ]);

        $caso->load('usuario');

        return response()->json($caso, 201);
    }

    public function show($id)
    {
        $caso = Caso::with('usuario')->findOrFail($id);
        return response()->json($caso);
    }
}