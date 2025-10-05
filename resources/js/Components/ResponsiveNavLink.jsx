import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
  active = false,
  className = '',
  children,
  ...props
}) {
  return (
    <Link
      {...props}
      className={`mk-responsive-link ${active ? 'mk-responsive-active' : ''} ${className}`}
    >
      {children}
    </Link>
  );
}
