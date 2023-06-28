import { useEffect, useRef } from 'react';

function DigitButton({ dispatch, digitButton }) {
    const buttonRowRef = useRef(null);

    useEffect(() => {
        const buttonRowElement = buttonRowRef.current;
        const buttonRowHeight = buttonRowElement.offsetHeight;
        const micImage = document.getElementById('micImage');
        micImage.style.height = `${buttonRowHeight}px`;
        const micImage2 = document.getElementById('micImage2');
        micImage2.style.height = `${buttonRowHeight}px`;
    }, []);

    return (
        <div ref={buttonRowRef}>
            <button type="button" className="btn btn-primary w-100 border-1 border-dark" onClick={() => dispatch({ action: "add-digit", digit: digitButton })}>{digitButton}</button>
        </div>
    )
}

export default DigitButton;