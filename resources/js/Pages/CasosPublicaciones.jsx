import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import MapaInteractivo from '@/Components/MapaInteractivo';
import ListadoCasos from '@/Components/ListadoCasos';
import { useState, useEffect } from 'react';

export default function CasosPublicaciones() {
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarCasos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/casos/lista', { credentials: 'include' });
      if (!res.ok) throw new Error('Error al cargar publicaciones');
      const data = await res.json();
      setCasos(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCasos();
  }, []);

  return (
    <AuthenticatedLayout>
      <Head title="Ver publicaciones" />
      <div className="mk-container" style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
          <div style={{ minHeight: 420, borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
            <MapaInteractivo casos={casos} />
          </div>

          <aside style={{ maxHeight: '75vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ margin: 0 }}>Casos recientes</h4>
              <button className="mk-link-button" onClick={cargarCasos} disabled={loading}>
                {loading ? 'Cargando...' : 'Actualizar'}
              </button>
            </div>

            {error && <div className="mk-error" style={{ marginBottom: 12 }}>{error}</div>}
            <ListadoCasos casos={casos} />
          </aside>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}