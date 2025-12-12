import { GameboyFrame } from './components/layout/GameboyFrame'
import { CinematicPlayer } from './components/layout/CinematicPlayer';
import { useState, useEffect } from 'react';
import { IntroScene } from './components/scenes/IntroScene';
import { QuizScene } from './components/scenes/QuizScene';
import { MapScene } from './components/scenes/MapScene';
import { BattleScene } from './components/scenes/BattleScene';
import { useGameState } from './hooks/useGameState';
import { useGameInput } from './hooks/useGameInput';
import { gameData } from './gameData';

import bgm from './assets/Pokemon Game Boy Opening.mp3';
import cinematicVideo from './assets/Cinematic.mp4';

function App() {
  const {
    phase,
    introStep,
    quizIndex,
    score,
    mapState,
    battleState,
    startGame,
    completeCinematic,
    nextIntroStep,
    completeIntro,
    answerQuiz,
    movePlayer,
    startBattle,
    performAttack,
    hp,
    restartGame,
    completeBattle
  } = useGameState();

  const { activeInput, setActiveInput } = useGameInput();

  // BGM Setup
  const [audio] = useState(new Audio(bgm));

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.5; // Reasonable default

    const playAudio = () => {
      audio.play().catch(e => console.log("Audio play blocked until interaction", e));
    };

    // Try playing immediately
    playAudio();

    // Also retry on first interaction if blocked
    const handleInteraction = () => {
      playAudio();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      audio.pause();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [audio]);

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

        {phase === 'CINEMATIC' && <CinematicPlayer
          src={cinematicVideo}
          onComplete={completeCinematic}
          activeInput={activeInput}
        />}

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
            hp={hp}
          />
        )}

        {phase === 'ENDING' && (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="text-lg font-bold mb-4">You are an Exemplary Leader!</div>
            <div className="text-xs mb-2">Score: {score}/{gameData.quizzes.length}</div>
            <div className="text-[10px]">Resume Unlocked.</div>
          </div>
        )}

        {phase === 'GAME_OVER' && (
          <div className="h-full bg-black text-white flex flex-col items-center justify-center p-4 animate-fade-in">
            <div className="text-xl font-bold mb-4 text-red-500">GAME OVER</div>
            <div className="text-xs text-center mb-8">Leadership requires resilience...</div>

            <div className="animate-pulse text-[10px] cursor-pointer" onClick={restartGame}>
              PRESS START (or Click) <br /> TO TRY AGAIN
            </div>

            {activeInput && (activeInput === 'START' || activeInput === 'A') && (
              restartGame() as unknown as React.ReactNode
            )}
          </div>
        )}

      </GameboyFrame>
    </div>
  );
}

export default App
