import React from 'react';

interface AlertProps {
    message: string;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
    return (
        <div className={"row d-flex justify-content-center"}>
            <div className="alert alert-danger w-50 " role="alert">
                {message}
            </div>
        </div>
    );
};

export default Alert;
