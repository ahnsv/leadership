
import React, { useEffect, useRef } from 'react';
import type { GameInput } from '../../hooks/useGameInput';
import { gameData } from '../../gameData';
import { GrassTile, PlayerTile, ObstacleTile } from '../assets/Tiles';

interface MapSceneProps {
    playerPos: { x: number; y: number };
    movePlayer: (dx: number, dy: number) => void;
    input: GameInput;
    setInput: (input: GameInput) => void;
    onEncounter: (enemyId: string) => void;
    defeatedEnemies: string[];
}

const MAP_SIZE = 10;
// Example map layout: 0 = Grass, 1 = Obstacle
const INITIAL_MAP = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const MapScene: React.FC<MapSceneProps> = ({ playerPos, movePlayer, input, setInput, onEncounter, defeatedEnemies }) => {

    // Debounce movement specifically for map to avoid zooming too fast
    const lastMoveTime = useRef(0);

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

            // Bounds and Obstacle check
            if (
                newX >= 0 && newX < MAP_SIZE &&
                newY >= 0 && newY < MAP_SIZE &&
                INITIAL_MAP[newY][newX] === 0
            ) {
                movePlayer(dx, dy);
                lastMoveTime.current = now;

                // Random Encounter Chance (10%)
                // Only if there are undefeated enemies
                const availableEnemies = gameData.battles.filter(b => !defeatedEnemies.includes(b.id));

                if (availableEnemies.length > 0 && Math.random() < 0.15) {
                    const randomEnemy = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
                    setInput(null); // Clear input so we don't move immediately in next scene
                    onEncounter(randomEnemy.id);
                }
            }
        }

        // Consume input if it was a movement
        if ((dx !== 0 || dy !== 0) && input) {
            // We normally clear input via useGameInput's logic or here. 
            // If we use 'setInput(null)' here, it might jerkiness. 
            // But useGameInput clears it on keyUp. 
            // For smooth movement while holding, we rely on the throttle.
        }

    }, [input, playerPos, movePlayer, onEncounter, defeatedEnemies, setInput]);

    return (
        <div className="w-full h-full bg-[#9bbc0f] relative grid grid-cols-10 grid-rows-10">
            {INITIAL_MAP.map((row, y) => (
                row.map((cell, x) => (
                    <div key={`${x}-${y}`} className="w-full h-full relative border-[0.5px] border-[#8baca0]/20">
                        {cell === 0 && <GrassTile />}
                        {cell === 1 && <ObstacleTile />}

                        {/* Player Rendering */}
                        {playerPos.x === x && playerPos.y === y && (
                            <div className="absolute inset-0 z-10 animate-pulse">
                                <PlayerTile />
                            </div>
                        )}
                    </div>
                ))
            ))}

            <div className="absolute top-1 left-1 bg-gb-dark/80 text-white text-[8px] p-1 rounded">
                Objective: Defeat your inner demons ({defeatedEnemies.length}/{gameData.battles.length})
            </div>
        </div>
    );
};
