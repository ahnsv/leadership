import { useState } from 'react';

export type GamePhase = 'START' | 'INTRO' | 'QUIZ' | 'MAP' | 'BATTLE' | 'ENDING';

export interface GameState {
    phase: GamePhase;
    introStep: number;
    quizIndex: number;
    quizCorrectCount: number;
}

export const useGameState = () => {
    const [gameState, setGameState] = useState<GameState>({
        phase: 'START',
        introStep: 0,
        quizIndex: 0,
        quizCorrectCount: 0,
    });

    const setPhase = (phase: GamePhase) => {
        setGameState(prev => ({ ...prev, phase }));
    };

    const nextIntroStep = () => {
        setGameState(prev => ({ ...prev, introStep: prev.introStep + 1 }));
    };

    const nextQuiz = (isCorrect: boolean) => {
        setGameState(prev => ({
            ...prev,
            quizIndex: prev.quizIndex + 1,
            quizCorrectCount: isCorrect ? prev.quizCorrectCount + 1 : prev.quizCorrectCount
        }));
    };

    const startGame = () => {
        setGameState({
            phase: 'INTRO',
            introStep: 0,
            quizIndex: 0,
            quizCorrectCount: 0,
        });
    };

    return {
        gameState,
        setPhase,
        nextIntroStep,
        nextQuiz,
        startGame,
    };
};
