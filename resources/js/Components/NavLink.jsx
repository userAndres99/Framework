import { Link } from '@inertiajs/react';

export default function NavLink({
  active = false,
  className = '',
  children,
  ...props
}) {
  return (
    <Link
      {...props}
      className={`mk-nav-link ${active ? 'mk-active' : ''} ${className}`}
    >
      {children}
    </Link>
  );
}
