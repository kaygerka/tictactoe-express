import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
/* MY HW4 TIC TAC TOE GAME COPIED */
// Square component
const Square = ({ value, onClick }) => (
    <button className="tile" onClick={onClick}>{value}</button>
);

// Board component
const Board = ({ squares, onClick }) => (
    <div className="board">
        {squares.map((square, i) => (
            <Square key={i} value={square} onClick={() => onClick(i)} />
        ))}
    </div>
);

// Custom hook
const useGameState = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    useEffect(() => {
        console.log('Board updated:', board);
    }, [board]);

    useEffect(() => {
        console.log('Game started!');
    }, []);

    return { board, xIsNext, setBoard, setXIsNext };
};

// Helper functions
const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

const checkTie = (squares) => {
    return squares.every(square => square !== null);
};

// Main Game component
const Game = () => {
    const { user } = useContext(GlobalContext);
    const { board, xIsNext, setBoard, setXIsNext } = useGameState();
    const [winner, setWinner] = useState(null);
    const [isTie, setIsTie] = useState(false);

    useEffect(() => {
        const calculatedWinner = calculateWinner(board);
        setWinner(calculatedWinner);
        if (!calculatedWinner && checkTie(board)) {
            setIsTie(true);
        } else {
            setIsTie(false);
        }
    }, [board]);

    const handleClick = (i) => {
        if (winner || board[i] || isTie) return;
        const newBoard = board.slice();
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setWinner(null);
        setIsTie(false);
    };

    const logGameResult = async () => {
        try {
            const response = await fetch('http://localhost:3000/log-game-result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    score: winner ? `${winner} wins` : (isTie ? "Tie" : "Incomplete"),
                    boardState: board 
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to log game result');
            }
        } catch (error) {
            console.error('Error logging game result:', error);
        }
    };

    useEffect(() => {
        if (winner || isTie) {
            logGameResult();
        }
    }, [winner, isTie]);

    return (
        <div className="game">
            <h1>Tic Tac Toe</h1>
            <h2>Welcome, {user?.username}!</h2>
            <Board squares={board} onClick={handleClick} />
            <div className="game-info">
                {winner ? `Winner: ${winner}` : 
                 isTie ? "It's a tie!" : 
                 `Next player: ${xIsNext ? 'X' : 'O'}`}
            </div>
            <button onClick={resetGame}>Reset Game</button>
        </div>
    );
};

export default Game;