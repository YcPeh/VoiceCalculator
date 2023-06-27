import "./App.css";
import "./styles.css"; // css version of styling
import { useReducer } from "react";
import DigitButton from './DigitButton';
import OperationButton from "./OperationButton";
import EqualsButton from "./EqualsButton";

const initialDisplay = { currentOperandText: "Down spaceeee", previousOperandText: "Up Spaceeee", currentOperand: "", previousOperand: "", operation: "",resultOperand:""}

function compute(states, operationIn) {
    let resultOperand;
    states.currentOperand = states.currentOperandText;
    switch (states.operation) {
        case "÷":
            resultOperand = parseFloat(states.previousOperand) / parseFloat(states.currentOperand)
            if (operationIn!=='') {
                return {
                    ...states,
                    currentOperandText: "",
                    previousOperand: resultOperand,
                    previousOperandText: `${resultOperand}${operationIn}`,
                    operation: operationIn
                }
            }else {
                return {
                    ...states,
                    currentOperandText: "",
                    previousOperand: resultOperand,
                    previousOperandText: `${resultOperand}${operationIn}`,
                    // operation: operationIn
                }
            }
            // break;
        case "-":
            resultOperand = parseFloat(states.previousOperand) - parseFloat(states.currentOperand)
            if (operationIn!=='') {
                return {
                    ...states,
                    currentOperandText: "",
                    previousOperand: resultOperand,
                    previousOperandText: `${resultOperand}${operationIn}`,
                    operation: operationIn
                }
            }else {
                return {
                    ...states,
                    currentOperandText: "",
                    previousOperand: resultOperand,
                    previousOperandText: `${resultOperand}${operationIn}`,
                    // operation: operationIn
                }
            }
            // break;
        case "*":
            resultOperand = parseFloat(states.previousOperand) * parseFloat(states.currentOperand)
            if (operationIn!=='') {
                return {
                    ...states,
                    currentOperandText: "",
                    previousOperand: resultOperand,
                    previousOperandText: `${resultOperand}${operationIn}`,
                    operation: operationIn
                }
            }else {
                return {
                    ...states,
                    currentOperandText: "",
                    previousOperand: resultOperand,
                    previousOperandText: `${resultOperand}${operationIn}`,
                    // operation: operationIn
                }
            }
            // break;
        case "+":
            resultOperand = parseFloat(states.previousOperand) + parseFloat(states.currentOperand)
            if (operationIn!=='') {
                return {
                    ...states,
                    currentOperandText: "",
                    previousOperand: resultOperand,
                    previousOperandText: `${resultOperand}${operationIn}`,
                    operation: operationIn
                }
            }else {
                return {
                    ...states,
                    currentOperandText: "",
                    previousOperand: resultOperand,
                    previousOperandText: `${resultOperand}${operationIn}`,
                    // operation: operationIn
                }
            }
            // break;
        default:
            break;
    }
    // console.log({...states});
    // if (operationIn!=='') {
    //     states.operation = operationIn
    // }
    // return {
    //     ...states,
    //     currentOperandText: "",
    //     previousOperand: states.resultOperand,
    //     previousOperandText: `${states.resultOperand}${operationIn}`,
    //     // operation: operationIn
    // }
}

function reducer(states, { action, digit }) {
    // let previousOperand;
    // if(states.previousOperandText === ""){
    //     previousOperand = states.previousOperandText
    // }else{

    // }
    // let currentOperand = states.currentOperandText;
    
    switch (action) {
        case "change-digit":
            return {
                ...states, currentOperandText: `${states.currentOperandText}${digit}`
            };
        case "operation":
            // console.log({...states});
            // states.operation = digit;
            if (states.currentOperandText !== '' && states.previousOperandText !== '') {
                return compute(states, digit);
                // return states;
            // 
            } else if (states.currentOperandText !== '') {
                // states.previousOperand = states.currentOperandText;
                return {
                    ...states,
                    currentOperand: states.currentOperandText,
                    previousOperandText: `${states.currentOperandText}${digit}`,
                    currentOperandText: '',
                    operation: digit,
                    previousOperand: states.currentOperandText
                };
            // 
            } else if (states.previousOperandText !== '') {
                // states.previousOperand = states.previousOperandText
                return {
                    ...states,
                    previousOperand:states.previousOperandText,
                    currentOperand: states.currentOperandText,
                    previousOperandText: `${states.previousOperand}${digit}`,
                    operation: digit
                };
            }

        case "compute":
            // console.log({...states});
            return compute(states,'');
            // return states;
            // break;
        case "delete-current":
            return {
                ...states, currentOperandText: states.currentOperandText.slice(0, -1)
            };
        case "clear-all":
            return {
                ...states, currentOperandText: '', previousOperandText: ''
            };
        default:
            break;
    }
}

function App() {
    const [states, dispatch] = useReducer(reducer, initialDisplay)
    return (
        <div className="container-flex p-0 d-flex align-items-center justify-content-center text-center" style={{ height: "100vh" }}>

            <div className="container">

                <div className="row border border-2 border-bottom-0 border-danger">
                    <div className="col p-0 text-break text-end d-flex align-items-center justify-content-end previous-operand">{states.previousOperandText}</div>
                </div>
                <div className="row border border-2 border-top-0 border-bottom-0 border-danger">
                    <div className="col p-0 text-break text-end d-flex align-items-center justify-content-end current-operand">{states.currentOperandText}</div>
                </div>
                <div className="row border border-2 border-bottom-0 border-danger">
                    <div className="col-6 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark" onClick={() => dispatch({ action: "clear-all" })}>AC</button>
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark" onClick={() => dispatch({ action: "delete-current" })}>DEL</button>
                    </div>
                    <div className="col-3 p-0">
                        <OperationButton dispatch={dispatch} operationButton="÷"></OperationButton>
                    </div>
                </div>
                <div className="row border border-2 border-top-0 border-bottom-0 border-danger">
                    <div className="col-3 p-0">
                        <DigitButton digitButton="1" dispatch={dispatch}></DigitButton>
                    </div>
                    <div className="col-3 p-0">
                        <DigitButton digitButton="2" dispatch={dispatch}></DigitButton>
                    </div>
                    <div className="col-3 p-0">
                        <DigitButton digitButton="3" dispatch={dispatch}></DigitButton>
                    </div>
                    <div className="col-3 p-0">
                        <OperationButton dispatch={dispatch} operationButton="*"></OperationButton>
                    </div>
                </div>
                <div className="row border border-2 border-top-0 border-bottom-0 border-danger">
                    <div className="col-3 p-0">
                        <DigitButton digitButton="4" dispatch={dispatch}></DigitButton>
                    </div>
                    <div className="col-3 p-0">
                        <DigitButton digitButton="5" dispatch={dispatch}></DigitButton>
                    </div>
                    <div className="col-3 p-0">
                        <DigitButton digitButton="6" dispatch={dispatch}></DigitButton>
                    </div>
                    <div className="col-3 p-0">
                        <OperationButton dispatch={dispatch} operationButton="+"></OperationButton>
                    </div>
                </div>
                <div className="row border border-2 border-top-0 border-bottom-0 border-danger">
                    <div className="col-3 p-0">
                        <DigitButton digitButton="7" dispatch={dispatch}></DigitButton>
                    </div>
                    <div className="col-3 p-0">
                        <DigitButton digitButton="8" dispatch={dispatch}></DigitButton>
                    </div>
                    <div className="col-3 p-0">
                        <DigitButton digitButton="9" dispatch={dispatch}></DigitButton>
                    </div>
                    <div className="col-3 p-0">
                        <OperationButton dispatch={dispatch} operationButton="-"></OperationButton>
                    </div>
                </div>
                <div className="row border border-2 border-top-0 border-danger">
                    <div className="col-3 p-0">
                        <DigitButton digitButton="." dispatch={dispatch}></DigitButton>
                    </div>
                    <div className="col-3 p-0">
                        <DigitButton digitButton="0" dispatch={dispatch}></DigitButton>
                    </div>
                    <div className="col-6 p-0">
                        <EqualsButton dispatch={dispatch}></EqualsButton>
                    </div>
                </div>

            </div>

        </div>

    );
}


export default App;