import React from 'react';

interface ButtonProps {
    message: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ message, onClick, type = 'button', className = 'btn btn-primary' }) => {
    return (
        <button type={type} className={className} onClick={onClick}>
            {message}
        </button>
    );
};

export default Button;