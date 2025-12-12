import { useState } from 'react';
import { gameData, type Battle } from '../gameData';

export type GamePhase = 'START' | 'INTRO' | 'QUIZ' | 'MAP' | 'BATTLE' | 'ENDING';

export interface GameState {
    phase: GamePhase;
    introStep: number;
    quizIndex: number;
    quizCorrectCount: number;
}


interface MapState {
    playerPos: { x: number; y: number };
    defeatedEnemies: string[]; // IDs of defeated enemies
}

interface BattleState {
    activeEnemy: Battle | null;
    playerTurn: boolean;
    battleLog: string[];
    isWon: boolean;
}


export const useGameState = () => {
    const [phase, setPhase] = useState<GamePhase>('START');
    const [introStep, setIntroStep] = useState(0);
    const [quizIndex, setQuizIndex] = useState(0);
    const [score, setScore] = useState(0);

    const [mapState, setMapState] = useState<MapState>({
        playerPos: { x: 5, y: 5 },
        defeatedEnemies: []
    });

    const [battleState, setBattleState] = useState<BattleState>({
        activeEnemy: null,
        playerTurn: true,
        battleLog: [],
        isWon: false
    });

    const startGame = () => setPhase('INTRO');

    const nextIntroStep = () => setIntroStep(prev => prev + 1);
    const completeIntro = () => setPhase('QUIZ');

    const answerQuiz = (correct: boolean) => {
        if (correct) setScore(prev => prev + 1);

        if (quizIndex < gameData.quizzes.length - 1) {
            setQuizIndex(prev => prev + 1);
        } else {
            setPhase('MAP');
        }
    };

    const movePlayer = (dx: number, dy: number) => {
        setMapState(prev => ({
            ...prev,
            playerPos: { x: prev.playerPos.x + dx, y: prev.playerPos.y + dy }
        }));
    };

    const startBattle = (enemy: Battle) => {
        setBattleState({
            activeEnemy: enemy,
            playerTurn: true,
            battleLog: [`A wild ${enemy.enemy} appeared!`],
            isWon: false
        });
        setPhase('BATTLE');
    };

    const performAttack = (strengthName: string) => {
        if (!battleState.activeEnemy) return;

        // Check against the 'weakness' property we added to Battle interface
        const isSuperEffective = strengthName === battleState.activeEnemy.weakness;

        if (isSuperEffective) {
            setBattleState(prev => ({
                ...prev,
                playerTurn: false,
                isWon: true,
                battleLog: [...prev.battleLog, `Used ${strengthName}!`, "It's super effective!", `${prev.activeEnemy?.enemy} defeated!`]
            }));
        } else {
            setBattleState(prev => ({
                ...prev,
                playerTurn: true,
                battleLog: [...prev.battleLog, `Used ${strengthName}...`, "It's not very effective...", `${prev.activeEnemy?.enemy} attacks back!`]
            }));
        }
    };

    const completeBattle = (won: boolean) => {
        if (won && battleState.activeEnemy) {
            setMapState(prev => ({
                ...prev,
                defeatedEnemies: [...prev.defeatedEnemies, battleState.activeEnemy!.id]
            }));

            if (mapState.defeatedEnemies.length + 1 >= gameData.battles.length) {
                setPhase('ENDING');
            } else {
                setPhase('MAP');
            }
        } else {
            setPhase('MAP'); // Run away or lost
        }
    };

    return {
        phase,
        introStep,
        quizIndex,
        score,
        mapState,
        battleState,
        setPhase,
        startGame,
        nextIntroStep,
        completeIntro,
        answerQuiz,
        movePlayer,
        startBattle,
        performAttack,
        completeBattle
    };
};
