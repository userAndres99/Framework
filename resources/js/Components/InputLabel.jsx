export default function InputLabel({
  value,
  className = '',
  children,
  ...props
}) {
  return (
    <label
      {...props}
      className={`mk-input-label block text-sm font-medium ${className}`}
    >
      {value ?? children}
    </label>
  );
}
