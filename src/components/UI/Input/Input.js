import React from 'react';

const Input = (props) => {
    const {
        type,
        placeholder = '',
        labelText,
        onChange,
        isRequired = false,
        validityMessage = 'Valid value.',
        invalidityMessage = 'Value should not empty or invalid!',
        isValidating = false,
        isValid = false,
        isExactValidation = false,
        value = ''
    } = props;
    const htmlFor = `${labelText.toLowerCase()}-${Math.random()}`;
    let validityClass = `${isValidating ? (isExactValidation ? (isValid ? 'is-valid' : 'is-invalid') : null) : null}`;
    return (
        <div className='form-group'>
            <label htmlFor={htmlFor} className='text-dark'>{labelText}:</label>
            <input
                type={type}
                id={htmlFor}
                placeholder={placeholder}
                className={`form-control ${validityClass}`}
                onChange={onChange}
                required={isRequired}
                value={value}/>
                {
                    isValidating
                        ? (
                        isValid
                            ?   <small className='valid-feedback'>{validityMessage}</small>
                            :   <small className='invalid-feedback'>{invalidityMessage}</small>
                        )
                        : null
                }
        </div>
    );
};

export default Input;