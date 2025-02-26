import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'lg';
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  className = '',
  size = 'lg',
  disabled = false
}: ButtonProps) => {
  const sizeStyles = {
    sm: 'w-[128px] h-[48px] font-md-semibold',
    lg: 'w-[392px] h-[56px] font-xl-semibold'
  };

  return (
    <button
      onClick={onClick}
      className={`w-full h-[56px] rounded-[12px] transition-all text-white bg-primary-700  ${sizeStyles[size]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
