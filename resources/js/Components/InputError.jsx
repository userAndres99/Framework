export default function InputError({ message, className = '', ...props }) {
  if (!message) return null;

  return (
    <p
      {...props}
      className={`mk-input-error text-sm ${className}`}
      role="alert"
    >
      {message}
    </p>
  );
}
