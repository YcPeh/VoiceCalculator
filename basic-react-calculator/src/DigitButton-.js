import React from 'react';

function DigitButton({onClick,digit}){
    return(
        <button type="button" className="btn btn-primary w-100 border-1 border-dark" onClick={onClick}>{digit}</button>
    )
}

export default DigitButton;