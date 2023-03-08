// Timer
// Implements component and logic for 2 player chess timer.

import './timer.css';
import React, {useState, useEffect} from 'react';

interface TimerProps {
    secAmount: number
}

// Uses milliseconds as unit
interface Itimer {
    active: boolean
    startTime: number // Updates to Date.now() when started
    PrevElapsed: number // Elapsed time from previous pause
    readonly deadline: number // Deadline for elapsed time
}

// P1 is white and P2 is black.
export type Player = "p1" | "p2"
export type TimeEndCallback = (timeoutPlayer: Player) => void;

// Timer class //
export class Timer {
    p1timer: Itimer
    p2timer: Itimer
    activePlayer: Player = "p1" // The chessboard defaults to white turn on start
    timeEnd: TimeEndCallback
    finished: boolean = false;
    test: number = 0; // DEBUG

    constructor(props: TimerProps, timeend: TimeEndCallback) {
        this.p1timer = {
            active: false,
            startTime: 0,
            PrevElapsed: 0,
            deadline: props.secAmount * 1000
        }
        this.p2timer = {
            active: false,
            startTime: 0,
            PrevElapsed: 0,
            deadline: props.secAmount * 1000
        }
        this.timeEnd = timeend;
    }
    getElapsed(player: Player): number {
        if (player === "p1") {
            if (this.p1timer.active) {
                return this.p1timer.PrevElapsed +
                    (Date.now() - this.p1timer.startTime);
            }
            else return this.p1timer.PrevElapsed
        }
        if (player === "p2") {
            if (this.p2timer.active) {
                return this.p2timer.PrevElapsed +
                    (Date.now() - this.p2timer.startTime);
            }
            else return this.p2timer.PrevElapsed
        }
        else return 0;
    }

    // Returns a string that can be shown in timer div
    // AND also checks for if game should end
    representation(player: Player): string {
        //console.log("Test number: " + this.test) // DEBUG
        let elapsed = 0;
        let deadline = 0;
        if (player === "p1") {
            elapsed = this.getElapsed("p1")
            deadline = this.p1timer.deadline
        }
        if (player === "p2") {
            elapsed = this.getElapsed("p2")
            deadline = this.p2timer.deadline
        }
        const timeLeft = deadline - elapsed;

        if (!this.finished && timeLeft < 0) {
            console.log("Time is up for " + player) // DEBUG
            this.finished = true;
            this.timeEnd(player)
        }

        if (!this.finished) {
            const minutes = Math.floor(timeLeft / 60000)
            const seconds: number = Math.floor((timeLeft % 60000) / 1000);

            let minutesString: string
            if (minutes < 10) minutesString = "0" + minutes.toString();
            else minutesString = minutes.toString();

            let secondsString: string
            if (seconds < 10) secondsString = "0" + seconds.toString();
            else secondsString = seconds.toString();

            return minutesString + ":" + secondsString;
        }
        else return "00:00"
    }

    startPlayer(player: Player) {
        console.log("startPlayer " + player + " called") // DEBUG
        if (player === "p1") {
            if (!this.p1timer.active) {
                this.p1timer.active = true
                this.p1timer.startTime = Date.now()
            }
        }
        if (player === "p2") {
            if (!this.p2timer.active) {
                this.p2timer.active = true
                this.p2timer.startTime = Date.now()
            }
        }
    }
    stopPlayer(player: Player) {
        console.log("stopPlayer " + player + " called") // DEBUG
        if (player === "p1") {
            if (this.p1timer.active) {
                this.p1timer.active = false
                this.p1timer.PrevElapsed += Date.now() - this.p1timer.startTime;
            }
        }
        if (player === "p2") {
            if (this.p2timer.active) {
                this.p2timer.active = false
                this.p2timer.PrevElapsed += Date.now() - this.p2timer.startTime;
            }
        }
    }

    togglePlayer(): void {
        console.log("togglePlayer called") // DEBUG
        console.log("activePlayer before switch " + this.activePlayer) // DEBUG
        if (this.activePlayer === "p1") this.activePlayer = "p2"
        else this.activePlayer = "p1"
        console.log("activePlayer is now " + this.activePlayer) // DEBUG

        if (this.isActive()) {
            if (this.p1timer.active) {
                this.stopPlayer("p1")
                this.startPlayer("p2")
            }
            else if (this.p2timer.active) {
                this.stopPlayer("p2")
                this.startPlayer("p1")
            }
        }

    }
    start(): void {
        if (this.activePlayer === "p1") {
            this.startPlayer("p1")
        }
        else this.startPlayer("p2")
    }

    // Resets the timer to a paused state
    reset(startPlayer: Player): void {
        this.p1timer.active = false;
        this.p1timer.startTime = 0;
        this.p1timer.PrevElapsed = 0;

        this.p2timer.active = false;
        this.p2timer.startTime = 0;
        this.p2timer.PrevElapsed = 0;

        this.activePlayer = startPlayer;
        this.finished = false;
    }

    pause(): void {
        this.stopPlayer("p1")
        this.stopPlayer("p2")
    }
    isActive() {
        // In case both are active at the same time for some reason
        if(this.p1timer.active && this.p2timer.active) {
            if (this.activePlayer === "p1") {
                this.stopPlayer("p2")
                return true
            }
            else {
                this.stopPlayer("p1")
                return true
            }
        }

        return this.p1timer.active || this.p2timer.active;
    }
}

//// Component below ////
interface ChessTimerProps {
    /*
    start: () => void,
    stop: () => void,
    representation: (player: Player) => string
    */
    //theTimer: MutableRefObject<Timer>
    timer: Timer
    setTimer: React.Dispatch<React.SetStateAction<Timer>>
}

function ChessTimer({timer, setTimer}: ChessTimerProps) {

    const [p1time, setP1time] = useState("00:00");
    const [p2time, setP2time] = useState("00:00");

    // Update the state of the clocks every second
    useEffect(() => {
        const interval = setInterval(() => {
            const timerCopy = Object.create(timer)
            setP1time(timerCopy.representation("p1"));
            setP2time(timerCopy.representation("p2"));
            setTimer(timerCopy)
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, setTimer]);

    function stopTimer (){
        const timerCopy = Object.create(timer)
        timerCopy.pause()
        setTimer(timerCopy)
    }
    function startTimer (){
        const timerCopy = Object.create(timer)
        timerCopy.start()
        setTimer(timerCopy)
    }

    return (
        <div id="timerContainer">
            <div id="p2container">
                Black time: <code id="timeDisplay"> {p2time}</code>

            </div>
            <div id="p1container">
                White time: <code id="timeDisplay">{p1time}</code>
            </div>
            <button onClick={startTimer}>Start timer</button>
            <button onClick={stopTimer}>Stop timer</button>
        </div>
    );
}

export default ChessTimer;
///////////////////////