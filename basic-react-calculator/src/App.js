import "./App.css";
import "./styles.css"; // css version of styling
import { useReducer } from "react";
// import DigitButton from './DigitButton';

const initialDisplay = {currentOperand:"Down spaceeee", previousOperand:"Up Spaceeee"}

function reducer(states,{action,digit}){
    switch (action) {
        case "change-digit":
            return{
                ...states, currentOperand: `${states.currentOperand}${digit}`
            }    
        case "delete-current":
            return{
                ...states, currentOperand: states.currentOperand.slice(0, -1)
            }    
        case "clear-all":
            return{
                ...states, currentOperand: "", previousOperand:""
            }    
        case "compute":
            return{
                ...states, currentOperand: "", previousOperand:""
            }    
        default:
            break;
    }
}

function App() {
    const [states,dispatch] = useReducer(reducer,initialDisplay)
    return (
        <div className="container-flex p-0 d-flex align-items-center justify-content-center text-center" style={{ height: "100vh" }}>

            <div className="container">

                <div className="row border border-2 border-bottom-0 border-danger">
                    <div className="col p-0 text-break text-end d-flex align-items-center justify-content-end previous-operand">{states.previousOperand}</div>
                </div>
                <div className="row border border-2 border-top-0 border-bottom-0 border-danger">
                    <div className="col p-0 text-break text-end d-flex align-items-center justify-content-end current-operand">{states.currentOperand}</div>
                </div>
                <div className="row border border-2 border-bottom-0 border-danger">
                    <div className="col-6 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark" onClick={() => dispatch({action:"clear-all"})}>AC</button>
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark" onClick={() => dispatch({action:"delete-current"})}>DEL</button>
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark" onClick={() => dispatch({action:"change-digit", digit:"÷"})}>÷</button>
                    </div>
                </div>
                <div className="row border border-2 border-top-0 border-bottom-0 border-danger">
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark" onClick={() => dispatch({action:"change-digit", digit:"1"})}>1</button>
                        {/* <DigitButton digit="1" onClick={() => dispatch({action:"change-digit", digitR:"1"})}></DigitButton> */}
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">2</button>
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">3</button>
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">*</button>
                    </div>
                </div>
                <div className="row border border-2 border-top-0 border-bottom-0 border-danger">
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">4</button>
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">5</button>
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">6</button>
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">+</button>
                    </div>
                </div>
                <div className="row border border-2 border-top-0 border-bottom-0 border-danger">
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">7</button>
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">8</button>
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">9</button>
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">-</button>
                    </div>
                </div>
                <div className="row border border-2 border-top-0 border-danger">
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">.</button>
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">0</button>
                    </div>
                    <div className="col-6 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">=</button>
                    </div>
                </div>

            </div>

        </div>

    );
}


export default App;