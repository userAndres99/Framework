import React from "react";

export default function ListaCasos({ casos }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Casos Registrados</h2>
      <ul className="list-disc pl-5 space-y-2">
        {casos.map(caso => (
          <li key={caso.id}>
            {caso.Descripcion} - Lat: {caso.Latitud}, Lng: {caso.Longitud}
          </li>
        ))}
      </ul>
    </div>
  );
}
