import React, { useState } from 'react';
import MapaInteractivo from './MapaInteractivo';

export default function FormCasos({ onCasoCreado }) {
  const [descripcion, setDescripcion] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [showMapModal, setShowMapModal] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setErrors({});

    if (!descripcion || !lat || !lng) {
      setMensaje('Completá la descripción y seleccioná la ubicación.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        Descripcion: descripcion,
        Latitud: parseFloat(lat),
        Longitud: parseFloat(lng),
      };
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

      const res = await fetch('/casos/crear', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        if (json?.errors) {
          setErrors(json.errors);
          setMensaje('Hay errores en el formulario.');
        } else {
          setMensaje(json?.message || 'Error al registrar el caso');
        }
        return;
      }

      setMensaje('Caso registrado correctamente ✅');
      setDescripcion('');
      setLat('');
      setLng('');
      if (onCasoCreado) onCasoCreado(json);
      setTimeout(() => setMensaje(''), 3000);
    } catch (err) {
      console.error(err);
      setMensaje(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (coords) => {
    if (Array.isArray(coords)) {
      setLat(String(coords[0]));
      setLng(String(coords[1]));
    } else if (coords && typeof coords === 'object') {
      setLat(String(coords.lat ?? ''));
      setLng(String(coords.lng ?? ''));
    }
    setShowMapModal(false);
  };

  return (
    <div className="mk-card mk-card-elevated formcasos-card">
      <h3 className="mk-card-title">Publicar caso</h3>

      {mensaje && (
        <div className="mk-alert mk-alert-info formcasos-alert">
          <span>{mensaje}</span>
          <button className="mk-link-button" onClick={() => setMensaje('')}>✕</button>
        </div>
      )}

      <form onSubmit={submit} className="formcasos-form">
        <div className="form-row">
          <label className="mk-label">Descripción</label>
          <textarea
            className="mk-input mk-textarea"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ej: Perro perdido, color marrón, coletero rojo, visto en Av. Corrientes"
            rows={5}
            aria-invalid={!!errors.Descripcion}
          />
          {errors.Descripcion && <div className="mk-error">{errors.Descripcion[0]}</div>}
        </div>

        <div className="form-row grid-2">
          <div>
            <label className="mk-label">Latitud</label>
            <input type="text" className="mk-input" value={lat} readOnly placeholder="Seleccionar en el mapa" />
            {errors.Latitud && <div className="mk-error">{errors.Latitud[0]}</div>}
          </div>

          <div>
            <label className="mk-label">Longitud</label>
            <input type="text" className="mk-input" value={lng} readOnly placeholder="Seleccionar en el mapa" />
            {errors.Longitud && <div className="mk-error">{errors.Longitud[0]}</div>}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => setShowMapModal(true)}
            className="mk-button secondary"
            disabled={loading}
          >
            {showMapModal ? 'Ocultar mapa' : 'Seleccionar ubicación'}
          </button>

          <button type="submit" className="mk-button primary" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar caso'}
          </button>
        </div>
      </form>

      {showMapModal && (
        <div className="mk-modal-backdrop" role="dialog" aria-modal="true" onClick={() => setShowMapModal(false)}>
          <div className="mk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mk-modal-header">
              <strong>Seleccionar ubicación</strong>
              <button className="mk-link-button" onClick={() => setShowMapModal(false)}>Cancelar</button>
            </div>
            <div className="mk-modal-body">
              <MapaInteractivo onLocationSelect={handleLocationSelect} initialCenter={lat && lng ? [parseFloat(lat), parseFloat(lng)] : null} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}