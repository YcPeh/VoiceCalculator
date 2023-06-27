
function DigitButton({dispatch,digitButton}){
    return(
        <button type="button" className="btn btn-primary w-100 border-1 border-dark" onClick={() => dispatch({ action: "change-digit", digit: digitButton })}>{digitButton}</button>
    )
}

export default DigitButton;