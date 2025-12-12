import { useEffect, useState } from 'react';
import { gameData, type Battle } from '../gameData';

export type GamePhase = 'START' | 'CINEMATIC' | 'INTRO' | 'QUIZ' | 'MAP' | 'BATTLE' | 'ENDING' | 'GAME_OVER';

export interface GameState {
    phase: GamePhase;
    introStep: number;
    quizIndex: number;
    quizCorrectCount: number;
    hp: number;
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
    const [hp, setHp] = useState(3);

    useEffect(() => {
        console.log(phase);
    }, [phase]);

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

    const startGame = () => {
        console.log('Starting game...');
        setPhase('CINEMATIC');
        setHp(3); // Reset HP on start
        setScore(0);
        setMapState({ playerPos: { x: 2, y: 2 }, defeatedEnemies: [] });
    };

    const completeCinematic = () => {
        console.log('Completing cinematic...');
        setPhase('INTRO');
    };

    const restartGame = () => {
        setPhase('START');
        setHp(3);
        setScore(0);
        setMapState({ playerPos: { x: 2, y: 2 }, defeatedEnemies: [] });
        setIntroStep(0);
        setQuizIndex(0);
    };

    const nextIntroStep = () => setIntroStep(prev => prev + 1);
    const completeIntro = () => setPhase('QUIZ');

    const answerQuiz = (correct: boolean) => {
        if (correct) setScore(prev => prev + 1);

        if (quizIndex < gameData.quizzes.length - 1) {
            setQuizIndex(prev => prev + 1);
        } else {
            setPhase('MAP');
            // Ensure proper start pos
            setMapState(prev => ({ ...prev, playerPos: { x: 2, y: 2 } }));
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
            // Player missed / used wrong move
            const dmg = 1;
            setHp(prev => {
                const newHp = prev - dmg;

                // Update log with damage info
                setBattleState(prevBattle => ({
                    ...prevBattle,
                    playerTurn: true, // Keep turn or toggle? Usually turn ends. But here it's "Counter attack".
                    battleLog: [
                        ...prevBattle.battleLog,
                        `Used ${strengthName}...`,
                        "It's not very effective...",
                        `${prevBattle.activeEnemy?.enemy} attacks back!`,
                        `Took ${dmg} damage!`
                    ]
                }));

                if (newHp <= 0) {
                    // Game Over trigger
                    setTimeout(() => {
                        setPhase('GAME_OVER');
                    }, 2000);
                }

                return newHp;
            });
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
        hp,
        mapState,
        battleState,
        setPhase,
        startGame,
        completeCinematic,
        restartGame,
        nextIntroStep,
        completeIntro,
        answerQuiz,
        movePlayer,
        startBattle,
        performAttack,
        completeBattle
    };
};
