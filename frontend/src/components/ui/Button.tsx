import React from 'react';

interface Props {
  children: React.ReactNode;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: string;
}

const Button: React.FC<Props> = ({
  children,
  variant = 'primary',
  type = 'button',
  isDisabled = false,
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`w-full px-4 py-1 text-slate-50 font-semibold rounded-lg text-sm
        ${
          variant === 'primary' && !isDisabled
            ? 'bg-blue-600 text-white'
            : isDisabled
            ? 'bg-blue text-white border-none cursor-not-allowed disabled'
            : 'bg-yellow-200 text-blue-600 border-solid border-blue-600 border-2'
        }`}
    >
      {children}
    </button>
  );
};

export default Button;