import React from 'react';

const Button = ({type, text, btnType, onClick, disabled}) => {
    return (
        <button
            className={`btn btn-${btnType} mr-4 px-4`}
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={{cursor: disabled ? 'not-allowed' : 'pointer'}}>
                {text}
        </button>
    );
};

export default Button;