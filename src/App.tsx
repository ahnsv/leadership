import { GameboyFrame } from './components/layout/GameboyFrame'
import { useState } from 'react';
import { IntroScene } from './components/scenes/IntroScene';
import { QuizScene } from './components/scenes/QuizScene';
import { MapScene } from './components/scenes/MapScene';
import { BattleScene } from './components/scenes/BattleScene';
import { useGameState } from './hooks/useGameState';
import { useGameInput } from './hooks/useGameInput';
import { gameData } from './gameData';

function App() {
  const {
    phase,
    introStep,
    quizIndex,
    score,
    mapState,
    battleState,
    startGame,
    nextIntroStep,
    completeIntro,
    answerQuiz,
    movePlayer,
    startBattle,
    performAttack,
    completeBattle
  } = useGameState();

  const { activeInput, setActiveInput } = useGameInput();

  return (
    <div className="h-screen w-screen bg-stone-100 flex items-center justify-center p-4">
      <GameboyFrame
        input={activeInput}
        setInput={setActiveInput}
      >
        {phase === 'START' && (
          <div className="h-full flex flex-col items-center justify-center animate-fade-in">
            <div className="text-xl font-bold mb-4 text-center">THE<br />LEADERSHIP<br />JOURNEY</div>
            <div className="animate-pulse text-xs mt-8">PRESS START</div>

            {/* Allow pressing A to start as well */}
            {activeInput && (activeInput === 'START' || activeInput === 'A') && (
              startGame() as unknown as React.ReactNode
            )}
          </div>
        )}

        {phase === 'INTRO' && (
          <IntroScene
            step={introStep}
            onNextStep={nextIntroStep}
            onComplete={completeIntro}
            input={activeInput}
            setInput={setActiveInput}
          />
        )}

        {phase === 'QUIZ' && (
          <QuizScene
            question={gameData.quizzes[quizIndex]}
            onAnswer={(correct) => answerQuiz(correct)}
            input={activeInput}
            setInput={setActiveInput}
          />
        )}

        {phase === 'MAP' && (
          <MapScene
            playerPos={mapState.playerPos}
            movePlayer={movePlayer}
            input={activeInput}
            setInput={setActiveInput}
            onEncounter={(id) => {
              const enemy = gameData.battles.find(b => b.id === id);
              if (enemy) startBattle(enemy);
            }}
            defeatedEnemies={mapState.defeatedEnemies}
          />
        )}

        {phase === 'BATTLE' && battleState.activeEnemy && (
          <BattleScene
            enemy={battleState.activeEnemy}
            onAttack={performAttack}
            onComplete={completeBattle}
            battleLog={battleState.battleLog}
            isWon={battleState.isWon}
            input={activeInput}
            setInput={setActiveInput}
          />
        )}

        {phase === 'ENDING' && (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="text-lg font-bold mb-4">YOU ARE AN ENVISIONED LEADER!</div>
            <div className="text-xs mb-2">Score: {score}/{gameData.quizzes.length}</div>
            <div className="text-[10px]">Resume Unlocked.</div>
          </div>
        )}

      </GameboyFrame>
    </div>
  );
}

export default App
