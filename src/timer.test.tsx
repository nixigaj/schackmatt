import ChessTimer, {Timer, Player} from './timer';
import {useState} from "react";

test('Start test', () => {
    const timer: Timer = new Timer({secAmount: 1}, () => {});

    timer.start()
    expect(timer.p1timer.active).toBe(true);
    expect(timer.p2timer.active).toBe(false);
});

test('Stop test', () => {
    const timer: Timer = new Timer({secAmount: 1}, () => {});

    timer.startPlayer("p1")
    timer.startPlayer("p2")
    timer.pause()
    expect(timer.p1timer.active).toBe(false);
    expect(timer.p2timer.active).toBe(false);
});

test('Toggle test', () => {
    const timer: Timer = new Timer({secAmount: 1}, () => {});

    expect(timer.activePlayer).toBe("p1");
    timer.togglePlayer()
    expect(timer.activePlayer).toBe("p2");

    timer.start()
    expect(timer.p1timer.active).toBe(false);
    expect(timer.p2timer.active).toBe(true);
    timer.togglePlayer()
    expect(timer.p1timer.active).toBe(true);
    expect(timer.p2timer.active).toBe(false);
});

test('Timeout test', async () => {
    const timer: Timer = new Timer({secAmount: 0.1}, (looser: Player) => {
        expect(looser).toBe("p1");
    });
    timer.start()
    // Wait for the timer to timeout
    await new Promise(resolve => setTimeout(resolve, 200));
    timer.representation("p1")
    timer.representation("p2")
});

test('Timeout test and reset test', async () => {
    let currentPlayer: Player = "p2"

    const timer: Timer = new Timer({secAmount: 0.1}, (looser: Player) => {
        expect(looser).toBe(currentPlayer);
    });

    timer.togglePlayer()
    timer.start()
    // Wait for the timer to timeout
    await new Promise(resolve => setTimeout(resolve, 200));
    timer.representation("p1")
    timer.representation("p2")

    timer.reset("p1")
    currentPlayer = "p1"
    timer.start()
    // Wait for the timer to timeout
    await new Promise(resolve => setTimeout(resolve, 200));
    timer.representation("p1")
    timer.representation("p2")
});
