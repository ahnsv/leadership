import { GameboyFrame } from './components/layout/GameboyFrame'
import { gameData } from './gameData';
import { useGameState } from './hooks/useGameState';
import { useGameInput } from './hooks/useGameInput';
import { IntroScene } from './components/scenes/IntroScene';
import { QuizScene } from './components/scenes/QuizScene';

function App() {
  const { gameState, setPhase, nextIntroStep, nextQuiz, startGame } = useGameState();
  const { activeInput, setActiveInput } = useGameInput();

  return (
    <GameboyFrame>
      {gameState.phase === 'START' && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <h1 className="text-sm font-bold animate-pulse">
            THE LEADERSHIP
            <br />
            JOURNEY
          </h1>
          <div className="w-full border-t border-gb-dark my-2"></div>
          <div className="text-[10px] cursor-pointer" onClick={startGame}>
            PRESS START
          </div>
          {/* Allow pressing A to start as well */}
          {activeInput && (activeInput === 'START' || activeInput === 'A') && (
            startGame() as unknown as React.ReactNode
          )}

          <div className="mt-8 text-[8px] opacity-70">
            © 1995 {gameData.hero.name}
          </div>
        </div>
      )}

      {gameState.phase === 'INTRO' && (
        <IntroScene
          step={gameState.introStep}
          onNextStep={nextIntroStep}
          onComplete={() => setPhase('QUIZ')}
          input={activeInput}
          setInput={setActiveInput}
        />
      )}

      {gameState.phase === 'QUIZ' && (
        <QuizScene
          quizIndex={gameState.quizIndex}
          onNextQuiz={nextQuiz}
          onComplete={() => setPhase('MAP')}
          input={activeInput}
          setInput={setActiveInput}
        />
      )}

      {gameState.phase === 'MAP' && (
        <div className="h-full flex items-center justify-center text-center p-4">
          <span className="text-xs">Phase 3: Map (Coming Soon)</span>
        </div>
      )}
    </GameboyFrame>
  )
}

export default App
