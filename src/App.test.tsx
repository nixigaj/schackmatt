import {ShortMove} from './App';
import { Chess } from "chess.js"

test('Move test', () => {
    // Triggers a legal move
    const moves: ShortMove[] = [{from: "a2", to: "a4"},
                                {from: "a7", to: "a5"}];

    const game: Chess = new Chess();
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        const result = game.move(move);
        expect(result).not.toBeNull();
    }
});

test('Check test', () => {
    // Triggers a check
    const moves: ShortMove[] = [{from: "e2", to: "e3"},
                                {from: "f7", to: "f5"},
                                {from: "e1", to: "e2"},
                                {from: "f5", to: "f4"},
                                {from: "e3", to: "e4"},
                                {from: "f4", to: "f3"}];

    const game: Chess = new Chess();
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        const result = game.move(move);
        expect(result).not.toBeNull();
    }
    expect(game.isCheck()).toBeTruthy();
});

test('Checkmate test', () => {
    // Triggers a checkmate
    const moves: ShortMove[] = [{from: "a2", to: "a4"},
                                {from: "a7", to: "a5"},
                                {from: "a4", to: "a5"},
                                {from: "b7", to: "b5"},
                                {from: "a5", to: "b6"},
                                {from: "c7", to: "c5"},
                                {from: "b6", to: "c7"},
                                {from: "d7", to: "d5"},
                                {from: "c7", to: "d8"},
                                {from: "e7", to: "e5"},
                                {from: "d8", to: "e7"},
                                {from: "f7", to: "f5"},
                                {from: "e7", to: "f6"},
                                {from: "g7", to: "g5"},
                                {from: "f6", to: "g5"},
                                {from: "h7", to: "h5"},
                                {from: "g5", to: "h4"},
                                {from: "a8", to: "h8"}];

    const game: Chess = new Chess();
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        const result = game.move(move);
        expect(result).not.toBeNull();
    }
    expect(game.isCheckmate()).toBeTruthy();
});
