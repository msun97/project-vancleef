import { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(
  (
    { placeholder, type = 'text', fullWidth = false, className, ...props },
    ref,
  ) => {
    return (
      <input
        type={type}
        ref={ref}
        placeholder={placeholder}
        className={clsx(
          'border-b border-gray-60 transition-colors duration-200 outline-none focus:border-primary-70',
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      />
    );
  },
);

export default Input;
