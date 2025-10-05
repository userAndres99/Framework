export default function Hero({
  title,
  subtitle,
  children,
  showContent = true,
  heroSrc = '/images/Hero.jpg',
  fallback = '/images/Fallback.png',
  imageClass = 'w-full h-64 object-cover',
}) {
  return (
    <section className="mk-page-header mk-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40, alignItems: 'center' }}>
      {showContent && (
        <div>
          {title && <h1 className="mk-title">{title}</h1>}
          {subtitle && <p className="mk-card-description" style={{ marginTop: 12 }}>{subtitle}</p>}
          {children}
        </div>
      )}

      <div className="mk-card mk-card-image" style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.04)' }}>
        <img
          src={heroSrc}
          alt={title ?? 'Imagen principal'}
          className={imageClass}
          width={1920}
          height={1080}
          loading="eager"
          fetchpriority="high"
          decoding="async"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }}
        />
      </div>
    </section>
  );
}
