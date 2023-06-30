import "./App.css";
import "./styles.css";
import { useReducer, useState } from "react";
import DigitButton from './DigitButton';
import OperationButton from "./OperationButton";
import EqualsButton from "./EqualsButton";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const initialDisplay = { currentOperandText: "", previousOperandText: "", currentOperand: "", previousOperand: "", operation: "", allowNewInput: false }

function compute(states, operationIn) {
    let resultOperand;
    if (states.currentOperandText === "") return states
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

    if (operationIn !== '') {
        return {
            ...states,
            currentOperand: "",
            currentOperandText: "",
            previousOperand: resultOperand,
            previousOperandText: `${resultOperand}${operationIn}`,
            operation: operationIn,
            allowNewInput: false,
        }
    } else {
        return {
            ...states,
            currentOperand: "",
            currentOperandText: "",
            previousOperand: resultOperand,
            previousOperandText: `${resultOperand}${operationIn}`,
            allowNewInput: true,
        }
    }

}

function computeVoiceInput(matches, states) {
    let resultOperand;

    for (let i = 0; i < matches.length - 1; i = i + 2) {
        const operation = matches[i + 1];
        let operand1;
        if (i === 0) {
            operand1 = parseFloat(matches[i]);
        } else {
            operand1 = resultOperand;
        }
        const operand2 = parseFloat(matches[i + 2]);

        switch (operation) {
            case "+":
                resultOperand = operand1 + operand2;
                break;
            case "-":
                resultOperand = operand1 - operand2;
                break;
            case "x":
                resultOperand = operand1 * operand2;
                break;
            case "/":
                resultOperand = operand1 / operand2;
                break;
            default:
                return states;
        }
    }
    const spacedInput = matches.join(" ");
    return {
        ...states,
        previousOperandText: `${spacedInput} = ${resultOperand}`,
        allowNewInput: true,
    };
}

function reducer(states, { action, digit }) {
    switch (action) {
        case "add-digit":
            if (digit === "0" && states.currentOperand === "0") return states
            if (digit === "." && states.currentOperand.includes(".")) return states
            const newCurrentOperandText = `${states.currentOperandText}${digit}`;
            if (states.allowNewInput === true) {
                return {
                    ...states,
                    previousOperand: "",
                    previousOperandText: "",
                    currentOperandText: newCurrentOperandText,
                    currentOperand: newCurrentOperandText,
                    allowNewInput: false,
                }
            } else {
                return {
                    ...states,
                    currentOperandText: newCurrentOperandText,
                    currentOperand: newCurrentOperandText,
                };
            }

        case "operation":
            if (states.currentOperandText === "" && states.previousOperandText === "") {
                return states;
            } else if (states.currentOperandText !== '' && states.previousOperandText !== '') {
                return compute(states, digit);
            } else if (states.currentOperandText !== '' || states.previousOperandText !== '') {
                let previousOperandTemp
                if (states.previousOperandText === '') {
                    previousOperandTemp = states.currentOperand;
                } else {
                    previousOperandTemp = states.previousOperand;
                }
                return {
                    ...states,
                    currentOperand: "",
                    previousOperandText: `${previousOperandTemp}${digit}`,
                    currentOperandText: '',
                    operation: digit,
                    previousOperand: previousOperandTemp,
                    allowNewInput: false,
                };
            }
            break;

        case "compute":
            return compute(states, '');
        case "delete-current":
            return {
                ...states, currentOperandText: states.currentOperandText.slice(0, -1)
            };
        case "clear-all":
            return {
                ...states, currentOperandText: '', previousOperandText: ''
            };
        case "input-transcript":
            // eslint-disable-next-line
            const regex = /\d+(\.\d+)?|[+\-x\/]/g;
            const matches = [digit.match(regex)];
            if (matches[0] !== null) {
                return computeVoiceInput(matches[0], states)
            } else {
                console.log("Voice can't be heard");
                window.alert("Voice can't be heard");
                return states;
            }
        default:
            return states;
    }
}


function App() {
    const [states, dispatch] = useReducer(reducer, initialDisplay)
    const { transcript, resetTranscript, listening } = useSpeechRecognition();
    const [lang, setLang] = useState('en')
    const [langDisplay, setLangDisplay] = useState('eng')

    const toggleLanguage = () => {
        switch (lang) {
            case 'en':
                setLang('th')
                setLangDisplay('thai')
                break;
            case 'th':
                setLang('zh-CN')
                setLangDisplay('chinese')
                break;
            case 'zh-CN':
                setLang('en')
                setLangDisplay('eng')
                break;

            default:
                break;
        }
    }

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
                <div className="row border border-2 border-top-0 border-bottom-0 border-danger">
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
                <div className="row border border-2 border-top-0 border-danger mic-row">
                    <div className="col-6 p-0">
                        <button type="button" className="btn btn-light w-100 border-1 border-dark" onClick={() => {
                            resetTranscript();
                            SpeechRecognition.startListening({
                                language: lang,
                                continuous: true
                            });
                        }}>
                            <img id="micImage" src="/mic start.png" alt="missing" />
                        </button>
                    </div>
                    <div className="col-6 p-0">
                        <button type="button" className="btn btn-light w-100 border-1 border-dark" onClick={() => {
                            SpeechRecognition.stopListening();
                            dispatch({ action: "input-transcript", digit: transcript });
                        }}>
                            <img id="micImage2" src="/mic stop.png" alt="missing" />
                        </button>
                    </div>
                </div>
                <br />
                <button type="button" onClick={toggleLanguage}>{langDisplay}</button>
                <br />
                <p>Microphone: {listening ? 'on' : 'off'}</p>
                {transcript && <p>text: <br />{transcript}</p>}
            </div>
        </div>
    );
}


export default App;