import clsx from 'clsx';

const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  icon,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'flex items-center justify-center font-medium transition-colors duration-200',
        variant === 'primary' && 'bg-gray-100 text-white hover:bg-gray-80',
        variant === 'secondary' &&
          'bg-transparent text-gray-100 border hover:bg-gray-100 hover:text-white',
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
