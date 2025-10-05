import React, { useState, useEffect } from "react";
import MapaInteractivo from "@/Components/MapaInteractivo";
import FormCasos from "@/Components/FormCasos";
import ListaCasos from "@/Components/ListadoCasos";

export default function Casos() {
  const [casos, setCasos] = useState([]);

  useEffect(() => {
    const cargarCasos = async () => {
      try {
        const res = await fetch("/casos/lista", { credentials: "include" });

        if (res.headers.get("content-type")?.includes("text/html")) {
          throw new Error("Usuario no autenticado o sesión expirada");
        }

        if (!res.ok) throw new Error("Error al cargar casos");

        const data = await res.json();
        setCasos(data);
      } catch (err) {
        console.error("Error al cargar casos:", err);
      }
    };

    cargarCasos();
  }, []);

  const agregarCaso = (nuevoCaso) => setCasos(prev => [nuevoCaso, ...prev]);

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <div style={{ flex: 1 }}><FormCasos onCasoCreado={agregarCaso} /></div>
      <div style={{ flex: 2 }}><MapaInteractivo casos={casos} /></div>
      <div style={{ flex: 1 }}><ListaCasos casos={casos} /></div>
    </div>
  );
}
