import React, { useState, useRef } from 'react';

export default function MyCounter() {

    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [interv, setInterv] = useState();

    let btnRef = useRef();

    function startTimer() {

        let newMs = time.ms, newS = time.s, newM = time.m, newH = time.h;

        function runMs() {

            if (newM === 60) {
                newH++;
                newM = 0;
            }
            if (newS === 60) {
                newM++;
                newS = 0;
            }
            if (newMs === 100) {
                newS++;
                newMs = 0;
            }

            newMs++;

            return setTime({ ms: newMs, s: newS, m: newM, h: newH });
        };

        runMs();
        setInterv(setInterval(runMs, 10));

        if(btnRef.current){
            btnRef.current.setAttribute("disabled", "disabled");
        }
    };

    function stopTimer() {
        clearInterval(interv);
        btnRef.current.removeAttribute("disabled");
    };

    function resetTimer() {
        clearInterval(interv);
        setTime({ ms: 0, s: 0, m: 0, h: 0 })
        btnRef.current.removeAttribute("disabled");
    };

    return (
        <div className="Timer">
            <div className="Counter">
                <div>
                    <span>Hours </span>
                    <span>Min</span>
                    <span>Sec</span>
                    <span>mSec</span>   
                </div>
                <div>
                    <span>{(time.h >= 10) ? time.h : "0" + time.h}</span>:
                    <span>{(time.m >= 10) ? time.m : "0" + time.m}</span>:
                    <span>{(time.s >= 10) ? time.s : "0" + time.s}</span>:
                    <span>{(time.ms >= 10) ? time.ms : "0" + time.ms}</span>
                </div>
            </div>

            <div>
                <button ref={btnRef} onClick={startTimer}>START</button>
                <button onClick={stopTimer}>STOP</button>
                <button onClick={resetTimer}>RESET</button>
            </div>
        </div>
    );
}