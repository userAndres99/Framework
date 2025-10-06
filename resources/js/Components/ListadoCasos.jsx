import React from 'react';

export default function ListaCasos({ casos = [], onSelect }) {
  if (!casos || casos.length === 0) {
    return (
      <div className="mk-card" style={{ padding: 16 }}>
        <h3 className="mk-card-title" style={{ marginBottom: 8 }}>Casos registrados</h3>
        <div style={{ color: '#6b7280' }}>No hay publicaciones todavía.</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 className="mk-card-title" style={{ margin: 0 }}>Casos registrados</h3>
        <small style={{ color: '#6b7280' }}>{casos.length} encontrados</small>
      </header>

      {casos.map((c) => {
        const descripcion = c.Descripcion ?? c.descripcion ?? '';
        const lat = c.Latitud ?? c.lat ?? '-';
        const lng = c.Longitud ?? c.lng ?? '-';
        const autor = c.usuario?.name ?? c.user?.name ?? 'Anónimo';
        const fecha = c.created_at ? new Date(c.created_at).toLocaleString() : '';

        return (
          <article
            key={c.id}
            className="mk-card"
            style={{ padding: 12, cursor: onSelect ? 'pointer' : 'default' }}
            onClick={() => onSelect && onSelect(c)}
            aria-label={`Caso ${descripcion}`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', fontSize: 14, color: '#0f172a', marginBottom: 6 }}>
                  {descripcion.length > 80 ? descripcion.slice(0, 77) + '…' : descripcion}
                </strong>
                <div style={{ color: '#374151', fontSize: 13, lineHeight: '1.3' }}>
                  <span style={{ display: 'inline-block', marginRight: 12 }}>Lat: <span style={{ color: '#111827' }}>{lat}</span></span>
                  <span>Lng: <span style={{ color: '#111827' }}>{lng}</span></span>
                </div>
              </div>

              <div style={{ marginLeft: 12, textAlign: 'right', minWidth: 110 }}>
                <div style={{ color: '#6b7280', fontSize: 12 }}>{autor}</div>
                {fecha && <div style={{ color: '#9ca3af', fontSize: 11, marginTop: 6 }}>{fecha}</div>}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}