export default function SecondaryButton({
  type = 'button',
  className = '',
  disabled,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      type={type}
      className={
        `mk-btn mk-btn-outline inline-flex items-center rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          disabled ? 'opacity-25 pointer-events-none' : 'hover:brightness-105 active:brightness-95'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
