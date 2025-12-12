import React, { useEffect, useRef } from 'react';
import type { GameInput } from '../../hooks/useGameInput';
import { GrassTile, PlayerTile } from '../assets/Tiles';

interface MapSceneProps {
    playerPos: { x: number; y: number };
    movePlayer: (dx: number, dy: number) => void;
    input: GameInput;
    setInput: (input: GameInput) => void;
    onEncounter: (enemyId: string) => void;
    defeatedEnemies: string[];
}
// Example map layout: 0 = Grass, 1 = Obstacle


export const MapScene: React.FC<MapSceneProps> = ({ playerPos, movePlayer, input, setInput, onEncounter, defeatedEnemies }) => {

    // Debounce movement specifically for map to avoid zooming too fast
    const lastMoveTime = useRef(0);

    const GYM_LOCATIONS: { [key: string]: { x: number, y: number, id: string } } = {
        'gym1': { x: 2, y: 2, id: 'gym1' },
        'gym2': { x: 12, y: 2, id: 'gym2' },
        'gym3': { x: 7, y: 7, id: 'gym3' },
        'gym4': { x: 2, y: 12, id: 'gym4' },
        'gym5': { x: 12, y: 12, id: 'gym5' },
    };

    // Keep map size small enough to reason about but large enough for 5 gyms
    const MAP_WIDTH = 15;
    const MAP_HEIGHT = 15;

    useEffect(() => {
        const now = Date.now();
        if (now - lastMoveTime.current < 200) return; // 200ms throttle

        let dx = 0;
        let dy = 0;

        if (input === 'UP') dy = -1;
        else if (input === 'DOWN') dy = 1;
        else if (input === 'LEFT') dx = -1;
        else if (input === 'RIGHT') dx = 1;

        if (dx !== 0 || dy !== 0) {
            const newX = playerPos.x + dx;
            const newY = playerPos.y + dy;

            // Bounds check
            if (newX >= 0 && newX < MAP_WIDTH && newY >= 0 && newY < MAP_HEIGHT) {
                // Check for Gym Interaction
                const gym = Object.values(GYM_LOCATIONS).find(g => g.x === newX && g.y === newY);
                if (gym) {
                    if (!defeatedEnemies.includes(gym.id)) {
                        setInput(null);
                        onEncounter(gym.id);
                        return; // Don't move onto the gym tile, just fight
                    }
                }

                // Allow movement if not blocked
                movePlayer(dx, dy);
                lastMoveTime.current = now;
            }
        }
    }, [input, playerPos, movePlayer, onEncounter, defeatedEnemies, setInput]);

    return (
        <div className="w-full h-full bg-[#9bbc0f] relative grid"
            style={{
                gridTemplateColumns: `repeat(${MAP_WIDTH}, 1fr)`,
                gridTemplateRows: `repeat(${MAP_HEIGHT}, 1fr)`
            }}>

            {/* Render Grid & Gyms */}
            {Array.from({ length: MAP_HEIGHT }).map((_, y) => (
                Array.from({ length: MAP_WIDTH }).map((_, x) => {
                    const gym = Object.values(GYM_LOCATIONS).find(g => g.x === x && g.y === y);
                    const isDefeated = gym && defeatedEnemies.includes(gym.id);

                    return (
                        <div key={`${x}-${y}`} className="w-full h-full relative border-[0.5px] border-[#8baca0]/20">
                            <GrassTile />

                            {gym && !isDefeated && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center">
                                    <div className="w-3/4 h-3/4 bg-red-500 rounded-full animate-bounce border-2 border-black"
                                        title="Gym Battle awaiting!" />
                                </div>
                            )}

                            {/* Player Rendering */}
                            {playerPos.x === x && playerPos.y === y && (
                                <div className="absolute inset-0 z-10 animate-pulse transition-all duration-200">
                                    <PlayerTile />
                                </div>
                            )}
                        </div>
                    );
                })
            ))}

            <div className="absolute top-1 left-1 bg-gb-dark/80 text-white text-[8px] p-1 rounded z-20">
                Gyms Defeated: {defeatedEnemies.length} / 5
            </div>
        </div>
    );
};
