import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import ResultList from '../../../../components/ResultList';

function InputTimer({ elapsedTime, isTiming, onChange }) {
    return (
        <input
            type="number"
            className="form-control mr-2"
            placeholder="Enter time..."
            
            value={ elapsedTime % 1 !== 0
                ?
                    Math.round(elapsedTime * 100) / 100
                    :
                    elapsedTime
            }
            disabled={isTiming}
            onChange={onChange}
            min="0"
            step="0.1"
        />
    );
}

function ControlButton({ label, onClick }) {
    return (
        <button className="btn btn-primary" onClick={onClick}>
            {label}
        </button>
    );
}


async function getHeigthfromTime(time) {
    const theta = {
        a: 1.8481726293897065, 
        b: 5.192126328600315,
    }
    
    
    return theta.a * time ** 2 + theta.b * time;
}

function Calculator() {
    const [state, setState] = useState("pre-record");
    const [elapsedTime, setElapsedTime] = useState(0);
    const [recordingTime, setRecordingTime] = useState('');
    const [results, setResults] = useState([]);
    const [savtBtnText, setSaveBtnText] = useState("skip");
    const [items, setItems] = useState(JSON.parse(localStorage.getItem("QBounceHistory")) || []); 
    
    useEffect(() => {
        let timer;
        if (state === "recording") {
            const startTime = Date.now();
            timer = setInterval(() => {
                setElapsedTime(((Date.now() - startTime) / 1000));
            }, 10);
        }
        return () => clearInterval(timer);
    }, [state]);

    const handleButtonClick = () => {
        switch (state) {
            case 'pre-record':
                setState("recording");
                // timeofsubmission: 
                console.log(new Date().toISOString());
                setRecordingTime(new Date().toISOString());
                break;
            case 'recording':
                setState("done-record");
                
                break;
            case 'done-record':
                recordingTime !== "" && setRecordingTime(new Date().toISOString());
        
                setResults([
                    {
                        timeofsubmission: recordingTime,
                        time: elapsedTime,
                        height: "-" // Placeholder for height calculation
                    }
                ]);
                getHeigthfromTime(elapsedTime).then((height) => {
                    console.log(height);
                    setResults([
                        {
                            name: "",
                            timeofsubmission: recordingTime,
                            time: elapsedTime,
                            height: height // Placeholder for height calculation
                        }
                    ]);

                    setState("showing-results");
                });
                console.log("debug");
                setState("awaiting-results");
                
                break;
                case 'submit-time':

                    setState("done-record");
                break;
            default:
                break;
        }
    };

    const resetState = () => {
        setElapsedTime(0);
        setRecordingTime('');
        setState("pre-record");
        setResults([]);
    };

    function handleSave() {
        if (!results[0].name) {
            setResults([{ ...results[0], name: "Unnamed result"}]);
        }
        const items = JSON.parse(localStorage.getItem('QBounceHistory')) || [];
        items.push(results[0]);
        setItems(items);
        localStorage.setItem('QBounceHistory', JSON.stringify(items));
        resetState();
    }

    function getName() {
        setState("take-name-input");
    }
    function handleChange(e) {
        e.target.value ? setSaveBtnText("save") : setSaveBtnText("skip");
        
        
        
        setResults([{ ...results[0], name: e.target.value }]);
    }
    const handleTimeChange = (e) => {
        const newTime = parseFloat(e.target.value);
        if ((state === "pre-record" || state === "submit-time") && !isNaN(newTime)) {
            setElapsedTime(newTime);
            state === "pre-record" && setState("submit-time");
            setRecordingTime(new Date().toISOString());
        }
    };
    return (
        <>
        
        <div className="container ">
        <h1>
            Qbounce
        </h1>
        <div className="container mt-4">
            <div className="d-flex mb-3">
                <InputTimer elapsedTime={elapsedTime} isTiming={!(state === "pre-record" || state === "submit-time")} onChange={handleTimeChange} />
                <ControlButton
                    onClick={handleButtonClick}
                    label={{
                        "pre-record": "Top of Path",
                        "recording": "Hit the Ground",
                        "done-record": "Calculate Height",
                        "submit-time": "submit time",
                        "awaiting-results": "Calculate Height"
                    }[state]}
                />
            </div>
            {(state === "showing-results" || state === "take-name-input") && (
                <>
                <h2>
                    your new result
                </h2>
                <ResultList results={results} 
                    onDelete={resetState}
                    onSave={getName}
                    setResults={setResults}
                />
                <p>you must save or delete the result to continue</p>
                </>
            )}
            {state === "take-name-input" && (
                <>
                    <input
                        type="text"
                        className="form-control mt-1"
                        placeholder="Enter name for recording..."
                        value={results[0].name}
                        onChange={handleChange}
                    />
                    <button className="btn btn-success mt-3" onClick={handleSave}>{savtBtnText}</button>
                </>
            )}

        </div>
        <h1>History</h1>
        <ResultList results={items} 
            onDelete={(e) => {
                console.log(e.target.id);
                const newItems = items.filter((item) => item.timeofsubmission !== e.target.id);
                localStorage.setItem('QBounceHistory', JSON.stringify(newItems));
                setItems(newItems)
            }}
        />
    </div>
    </>
    );
}

export default Calculator;
