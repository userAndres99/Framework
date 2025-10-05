export default function PrimaryButton({
  className = '',
  disabled,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={
        `mk-btn mk-btn-primary inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          disabled ? 'opacity-25 pointer-events-none' : 'hover:brightness-105 active:brightness-90'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
