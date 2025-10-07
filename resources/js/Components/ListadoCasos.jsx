import React from 'react';

export default function ListaCasos({ casos = [], onSelect }) {
  if (!casos || casos.length === 0) {
    return (
      <div className="mk-casos-panel" style={{ padding: 16 }}>
        <h3 className="mk-casos-title" style={{ marginBottom: 8 }}>Casos registrados</h3>
        <div className="mk-casos-empty">No hay publicaciones todavía.</div>
      </div>
    );
  }

  return (
    <div className="mk-casos-panel" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 12 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 className="mk-casos-title" style={{ margin: 0 }}>Casos registrados</h3>
        <small className="mk-casos-count">{casos.length} encontrados</small>
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
            className="mk-caso-item"
            onClick={() => onSelect && onSelect(c)}
            aria-label={`Caso ${descripcion}`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <strong className="mk-caso-title">
                  {descripcion.length > 80 ? descripcion.slice(0, 77) + '…' : descripcion}
                </strong>
                <div className="mk-caso-meta">
                  <span style={{ marginRight: 12 }}>Lat: <span className="mk-caso-coord">{lat}</span></span>
                  <span>Lng: <span className="mk-caso-coord">{lng}</span></span>
                </div>
              </div>

              <div style={{ marginLeft: 12, textAlign: 'right', minWidth: 110 }}>
                <div className="mk-caso-author">{autor}</div>
                {fecha && <div className="mk-caso-date">{fecha}</div>}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}