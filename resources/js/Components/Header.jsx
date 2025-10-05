import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Nav from '@/Components/Nav';

export default function Header({ auth, canLogin, canRegister }) {
  return (
    <header className="mk-navbar">
      <div className="mk-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href={route('home')} aria-label="Ir al inicio" className="mk-navbar-brand inline-flex items-center">
            <ApplicationLogo className="h-8 w-8" />
            <span className="mk-brand-title">Huellas Solidarias</span>
          </Link>
        </div>

        <Nav auth={auth} canLogin={canLogin} canRegister={canRegister} />
      </div>
    </header>
  );
}
