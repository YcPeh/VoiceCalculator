
function EqualsButton({operationButton, dispatch}) {
    return(
        <button type="button" className="btn btn-primary w-100 border-1 border-dark" onClick={() => dispatch({ action: "compute" })}>=</button>
    )
}

export default EqualsButton;