import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const iconAnimal = new L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  iconSize: [32, 32]
});

function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect([lat, lng]);
    }
  });

  return position ? <Marker position={position} icon={iconAnimal} /> : null;
}

export default function MapaInteractivo({ onLocationSelect, casos = [] }) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const cargarMarkers = async () => {
      try {
        const res = await fetch("/casos/lista", { credentials: "include" });

        if (res.headers.get("content-type")?.includes("text/html")) {
          throw new Error("Usuario no autenticado o sesión expirada");
        }

        if (!res.ok) throw new Error("Error al cargar marcadores");

        const data = await res.json();
        setMarkers(data);
      } catch (err) {
        console.error(err);
      }
    };

    cargarMarkers();
  }, []);

  return (
    <MapContainer center={[-38.9339, -67.990]} zoom={13} className="h-[500px] w-full rounded-lg shadow-lg border border-gray-300">
      <TileLayer
        attribution='Tiles &copy; Esri'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
      />

      {onLocationSelect && <LocationMarker onLocationSelect={onLocationSelect} />}

      {markers.map((m, i) => (
        <Marker key={i} position={[m.Latitud, m.Longitud]} icon={iconAnimal}>
          <Popup>Animal Reportado Aquí</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
