import { GameboyFrame } from './components/layout/GameboyFrame'
import { gameData } from './gameData';

function App() {
  return (
    <GameboyFrame>
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <h1 className="text-sm font-bold animate-pulse">
          THE LEADERSHIP
          <br />
          JOURNEY
        </h1>
        <div className="w-full border-t border-gb-dark my-2"></div>
        <div className="text-[10px]">
          PRESS START
        </div>

        <div className="mt-8 text-[8px] opacity-70">
          © 2025 {gameData.hero.name}
        </div>
      </div>
    </GameboyFrame>
  )
}

export default App
