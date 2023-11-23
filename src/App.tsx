import './App.css';
import {useCallback, useEffect, useRef, useState} from 'react';
import { Chess, Square, Move } from "chess.js";
import { Chessboard } from "react-chessboard";
import {Player, Timer} from "./timer"
import ChessTimer from './timer'
import {GameSounds} from "./audio";

export interface ShortMove {
    from: Square;
    to: Square;
    promotion?: string;
}

function App() {
    const INIT_TIME = 180;

    const checkTriggeredRef = useRef(false);

    const [currentPlayer, setCurrentPlayer] = useState("white");
    const [gameStatus, setGameStatus] = useState("");

    const [timer, setTimer] = useState(new Timer({secAmount: INIT_TIME}, timeoutLoss));

    const audio: GameSounds = new GameSounds()

    const [game, setGame] = useState(new Chess());
    const gameCopy: Chess = Object.create(game);

    function makeAMove(move: ShortMove | string) : Move | null {
        console.log(move);
        const result = gameCopy.move(move);
        setGame(gameCopy);
        return result; // null if the move was illegal, move the object if the move was legal
    }

    // This does a completely random move with no intelligence
    function makeRandomMove() {
        const possibleMoves = gameCopy.moves() as string[];
        if (gameCopy.isGameOver() || gameCopy.isDraw() || possibleMoves.length === 0)
            return; // exit if the game is over
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeAMove(possibleMoves[randomIndex]);
    }

    function onDrop(sourceSquare: Square, targetSquare: Square): boolean {
        if (makeAMove({ from: sourceSquare, to: targetSquare })) {
            //makeRandomMove(); // Uncomment to play against random bot
            afterDrop()
            return true;
        } else if (makeAMove({ from: sourceSquare, to: targetSquare, promotion: 'q' })) {
            //makeRandomMove(); // Uncomment to play against random bot
            afterDrop()
            return true;
        } else {
            return false;
        }
    }

    function afterDrop() {
        audio.playMove()

        const timerCopy: Timer = Object.create(timer);

        timerCopy.togglePlayer()
        if (timerCopy.activePlayer === "p1") {
            setCurrentPlayer("white")
        }
        else {
            setCurrentPlayer("black")
        }

        setTimer(timerCopy)

        checkTriggeredRef.current = false

        checkEnd()
    }

    function timeoutLoss(looser: Player) {
        if (looser === "p1") {
            setGameStatus("Time out! White lost!")
        }
        else {
            setGameStatus("Time out! Black lost!")
        }
    }

    function resetGame() {
        setGame(new Chess());
        setTimer(new Timer({secAmount: INIT_TIME}, timeoutLoss));
        setCurrentPlayer("white")
        setGameStatus("")
    }

    const checkCheck = useCallback(() => {
        if (game.isCheck()) {
            if (!checkTriggeredRef.current)  {
                checkTriggeredRef.current = true
                audio.playCheck()
                console.log("Check!")
            }
        }
    }, [game, checkTriggeredRef, audio]);

    // This is needed to be run every 0.5s to fix a bug with chess.js
    useEffect(() => {
        const interval = setInterval(() => {
            checkCheck()
        }, 500);

        return () => clearInterval(interval);
    }, [checkCheck]);

    function checkEnd() {
        const possibleMoves = gameCopy.moves() as string[];
        if (gameCopy.isGameOver() || gameCopy.isDraw() || possibleMoves.length === 0) {
            console.log("Game over")
            setGameStatus("Game over");
            audio.playCheckmate()
            const timerCopy: Timer = Object.create(timer);
            timerCopy.pause()
            setTimer(timerCopy)
        }
    }

    return (
        <div id="main-content">
            <div id="headerbar">
                <div id="logo-title">
                    ♟ schackmatt
                </div>
                <div>
                    <button onClick={resetGame} id="reset-button">Reset / Resign</button>
                </div>
            </div>
            <div id="chess-pane">
                <div id="playerTurn">
                    Current player is {currentPlayer}
                </div>
                <div id="gameStatus">
                    {gameStatus}
                </div>
                <div id="timer1">
                    <ChessTimer timer={timer} setTimer={setTimer}/>
                </div>
                <div id="chessboard">
                    <Chessboard position={game.fen()} onPieceDrop={onDrop} />
                </div>
            </div>
        </div>
    );
}

export default App;
