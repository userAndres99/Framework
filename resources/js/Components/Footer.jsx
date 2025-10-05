import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <footer className="mk-footer">
      <div className="mk-container mk-footer-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>© {new Date().getFullYear()} Huellas Solidarias</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <Link href="/politica-privacidad" className="mk-footer-link">Política de privacidad</Link>
          <Link href="/terminos" className="mk-footer-link">Términos</Link>
        </div>
      </div>
    </footer>
  );
}
