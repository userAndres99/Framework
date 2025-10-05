import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
  { type = 'text', className = '', isFocused = false, ...props },
  ref,
) {
  const localRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) localRef.current?.focus();
  }, [isFocused]);

  return (
    <input
      {...props}
      type={type}
      ref={localRef}
      className={`mk-input rounded-md border border-transparent bg-[rgba(255,255,255,0.04)] text-sm text-white placeholder:text-[rgba(255,255,255,0.5)] shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--mk-primary)] ${className}`}
    />
  );
});
