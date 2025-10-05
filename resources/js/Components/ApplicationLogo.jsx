export default function ApplicationLogo({ className = 'h-8 w-8', src = '/images/icono.jpg', alt = 'Huellas Solidarias', ...props }) {
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={`${className} mk-brand-logo`}
      width={32}
      height={32}
      loading="eager"
      decoding="async"
    />
  );
}
