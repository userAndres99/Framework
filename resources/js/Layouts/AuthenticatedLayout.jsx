import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user;
  const logoHref = user ? route('dashboard') : '/';

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="min-h-screen mk-body">
      <nav className="mk-navbar">
        <div className="mk-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href={logoHref} className="mk-navbar-brand inline-flex items-center">
              <ApplicationLogo className="h-9 w-9 mk-brand-logo" />
              <span className="mk-brand-title">Huellas Solidarias</span>
            </Link>

            <div className="hidden sm:flex" style={{ marginLeft: 24 }}>
              <NavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</NavLink>

              <NavLink href={route('casos')} active={route().current('casos')}>
                Publicar caso
              </NavLink>
              <NavLink href={route('casos.publicaciones')} active={route().current('casos.publicaciones')}>
                Ver publicaciones
              </NavLink>

              <NavLink href={route('blog.index')} active={route().current('blog.index')}>
                Blog
              </NavLink>
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center" style={{ gap: 12 }}>
            <div className="relative">
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="mk-link-button inline-flex items-center"
                    >
                      {user.name}
                      <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                </Dropdown.Trigger>

                <Dropdown.Content>
                  <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                  <Dropdown.Link href={route('logout')} method="post" as="button">Cerrar sesión</Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>

          <div className="-me-2 flex items-center sm:hidden">
            <button
              onClick={() => setShowingNavigationDropdown(prev => !prev)}
              className="mk-toggler inline-flex items-center justify-center p-2"
              aria-expanded={showingNavigationDropdown}
              aria-controls="mobile-menu"
            >
              <span className="mk-toggler-icon" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div id="mobile-menu" className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
          <div className="space-y-1 pb-3 pt-2">
            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>

            <ResponsiveNavLink href={route('casos')} active={route().current('casos')}>
              Publicar caso
            </ResponsiveNavLink>
            <ResponsiveNavLink href={route('casos.publicaciones')} active={route().current('casos.publicaciones')}>
              Ver publicaciones
            </ResponsiveNavLink>

            <ResponsiveNavLink href={route('blog.index')} active={route().current('blog.index')}>
              Blog
            </ResponsiveNavLink>
          </div>

          <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            <div className="px-4">
              <div className="text-base font-medium">{user.name}</div>
              <div className="text-sm">{user.email}</div>
            </div>

            <div className="mt-3 space-y-1 px-4 pb-4">
              <ResponsiveNavLink href={route('profile.edit')}>Perfil</ResponsiveNavLink>
              <ResponsiveNavLink method="post" href={route('logout')} as="button">Cerrar sesión</ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="mk-card-plain" style={{ background: 'transparent' }}>
          <div className="mk-container" style={{ padding: '1.25rem 0' }}>
            {header}
          </div>
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}