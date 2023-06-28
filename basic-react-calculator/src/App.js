import "./App.css";
import "./styles.css"; // css version of styling
import { useReducer } from "react";
import DigitButton from './DigitButton';
import OperationButton from "./OperationButton";
import EqualsButton from "./EqualsButton";

const initialDisplay = { currentOperandText: "Down spaceeee", previousOperandText: "Up Spaceeee", currentOperand: "", previousOperand: "", operation: ""}

function compute(states, operationIn) {
    let resultOperand;
    // states.currentOperand = states.currentOperandText;
    if(states.currentOperandText === "") return states
    let currentOperand = states.currentOperandText;
    switch (states.operation) {
        case "÷":
            resultOperand = parseFloat(states.previousOperand) / parseFloat(currentOperand)
            break;
        case "-":
            resultOperand = parseFloat(states.previousOperand) - parseFloat(currentOperand)
            break;
        case "*":
            resultOperand = parseFloat(states.previousOperand) * parseFloat(currentOperand)
            break;
        case "+":
            resultOperand = parseFloat(states.previousOperand) + parseFloat(currentOperand)
            break;
        default:
            return states;
    }

    if (operationIn!=='') {
        return {
            ...states,
            currentOperand:"",
            currentOperandText: "",
            previousOperand: resultOperand,
            previousOperandText: `${resultOperand}${operationIn}`,
            operation: operationIn
        }
    }else {
        return {
            ...states,
            currentOperand:"",
            currentOperandText: "",
            previousOperand: resultOperand,
            previousOperandText: `${resultOperand}${operationIn}`,
            // operation: operationIn
        }
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
            const newCurrentOperandText = `${states.currentOperandText}${digit}`;
            return {
                ...states, 
                currentOperandText: newCurrentOperandText,
                currentOperand: newCurrentOperandText,
            };
        case "operation":
            // console.log({...states});
            // states.operation = digit;
            if (states.currentOperandText !== '' && states.previousOperandText !== '') {
                return compute(states, digit);
                // return states;
            // 
            } else if (states.currentOperandText !== '' || states.previousOperandText !== '') {
                // states.previousOperand = states.currentOperandText;
                let previousOperandTemp
                if(states.previousOperandText === ''){
                    previousOperandTemp = states.currentOperand;
                }else{
                    previousOperandTemp = states.previousOperand;
                }
                return {
                    ...states,
                    currentOperand: "",
                    previousOperandText: `${previousOperandTemp}${digit}`,
                    currentOperandText: '',
                    operation: digit,
                    previousOperand: previousOperandTemp
                };
            }
            // 
            // } else if (states.previousOperandText !== '') {
            //     // states.previousOperand = states.previousOperandText
            //     return {
            //         ...states,
            //         previousOperand:states.previousOperandText,
            //         currentOperand: states.currentOperandText,
            //         previousOperandText: `${states.previousOperand}${digit}`,
            //         operation: digit
            //     };
            // }
            break;

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
            return states;
    }
}

function App() {
    const [states, dispatch] = useReducer(reducer, initialDisplay)
    return (
        <div className="container-flex p-0 d-flex align-items-center justify-content-center text-center" style={{ height: "100vh" }}>

            <div className="container">

                <div className="row border border-2 border-bottom-0 border-danger text-white">
                    <div className="col p-0 text-break text-end d-flex align-items-center justify-content-end previous-operand">{states.previousOperandText}</div>
                </div>
                <div className="row border border-2 border-top-0 border-bottom-0 border-danger text-white">
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