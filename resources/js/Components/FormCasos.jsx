import React, { useState } from "react";
import MapaInteractivo from "./MapaInteractivo";

export default function FormCasos({ onCasoCreado }) {
  const [descripcion, setDescripcion] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descripcion || !lat || !lng) {
      setMensaje("Por favor completá todos los campos y seleccioná la ubicación.");
      return;
    }

    const datos = { Descripcion: descripcion, Latitud: parseFloat(lat), Longitud: parseFloat(lng) };

    try {
      const res = await fetch("/casos/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
         },
        credentials: "include",
        
        body: JSON.stringify(datos)
      });

      if (res.headers.get("content-type")?.includes("text/html")) {
        throw new Error("Usuario no autenticado o sesión expirada");
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al registrar el caso ❌");
      }

      const data = await res.json();
      setMensaje("Caso registrado correctamente ✅");
      setDescripcion('');
      setLat('');
      setLng('');

      if (onCasoCreado) onCasoCreado(data);

    } catch (error) {
      console.error(error);
      setMensaje(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-emerald-50 to-white">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 md:p-12 border border-emerald-100">
        <h2 className="text-3xl font-bold mb-6 text-emerald-700 text-center">Registrar Caso</h2>

        {mensaje && <div className="mb-4 p-3 rounded bg-emerald-100 text-emerald-800 text-center font-medium">{mensaje}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Descripción:</label>
            <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej: Perro perdido en el parque"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700">Latitud:</label>
              <input type="text" value={lat} readOnly className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100" placeholder="Seleccionar en el mapa"/>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold text-gray-700">Longitud:</label>
              <input type="text" value={lng} readOnly className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100" placeholder="Seleccionar en el mapa"/>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <button type="button" onClick={() => setMostrarMapa(!mostrarMapa)}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-semibold">
              {mostrarMapa ? "Ocultar mapa" : "Seleccionar Ubicación"}
            </button>
            <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">Enviar</button>
          </div>
        </form>

        {mostrarMapa && (
          <div className="mt-6 h-64 border border-emerald-200 rounded-lg overflow-hidden">
            <MapaInteractivo onLocationSelect={(coords) => { setLat(coords[0]); setLng(coords[1]); setMostrarMapa(false); }} />
          </div>
        )}
      </div>
    </div>
  );
}
