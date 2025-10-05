import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';

export default function Nav({ auth, canLogin, canRegister }) {
  return (
    <nav aria-label="Navegación principal" className="mk-navbar-nav" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <NavLink href={route('home')} active={route().current('home')}>Inicio</NavLink>

      {auth?.user ? (
        <>
          <NavLink href={route('dashboard')} active={route().current('dashboard')}>Panel</NavLink>
          <form method="POST" action={route('logout')} className="inline">
            <button type="submit" className="mk-link-button">Cerrar sesión</button>
          </form>
        </>
      ) : (
        <>
          {canLogin && <NavLink href={route('login')}>Iniciar sesión</NavLink>}
          {canRegister && <NavLink href={route('register')} className="mk-cta">Crear cuenta</NavLink>}
        </>
      )}

      <Dropdown>
        <Dropdown.Trigger>
          <button className="mk-more">Más</button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Link href="/politica-privacidad">Política de privacidad</Dropdown.Link>
          <Dropdown.Link href="/terminos">Términos</Dropdown.Link>
        </Dropdown.Content>
      </Dropdown>
    </nav>
  );
}
