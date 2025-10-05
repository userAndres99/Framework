export default function TarjetaCaracteristica({ titulo, children, className = '' }) {
  return (
    <div className={`mk-card ${className}`}>
      <h4 className="mk-card-title">{titulo}</h4>
      <p className="mk-card-description" style={{ marginTop: 8 }}>{children}</p>
    </div>
  );
}
