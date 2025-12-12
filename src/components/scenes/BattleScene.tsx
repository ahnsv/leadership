
import React, { useState, useEffect } from 'react';
import { DialogBox } from '../layout/DialogBox';
import type { GameInput } from '../../hooks/useGameInput';
import type { Battle } from '../../gameData';

interface BattleSceneProps {
    enemy: Battle;
    onAttack: (strength: string) => void;
    onComplete: (won: boolean) => void;
    battleLog: string[];
    isWon: boolean;
    input: GameInput;
    setInput: (input: GameInput) => void;
}

export const BattleScene: React.FC<BattleSceneProps> = ({ enemy, onAttack, onComplete, battleLog, isWon, input, setInput }) => {

    // We can hardcode 4 "moves" based on logic.
    // Ideally these come from GameData too, but let's derive them.
    // The player needs to select the "Strength" that matches the Weakness.
    // Let's give 4 options: The correct one, plus 3 random others from a pool.

    // For simplicity, let's just list 4 generic leadership strengths.
    // One MUST be the correct counter.
    const [options, setOptions] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [mode, setMode] = useState<'MENU' | 'LOG'>('MENU');

    useEffect(() => {
        // Initialize options on mount
        const correct = enemy.weakness;
        const others = ["Micromanage", "Ignore It", "Blame Others", "Overwork", "Delegation", "Empathy", "Vision"].filter(x => x !== correct);

        // Shuffle and pick 3 others
        const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 3);
        const all = [correct, ...shuffled].sort(() => 0.5 - Math.random());
        setOptions(all);
    }, [enemy]);

    // Handle Input
    useEffect(() => {
        if (mode === 'MENU') {
            if (input === 'UP') setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
            else if (input === 'DOWN') setSelectedIndex(prev => (prev < options.length - 1 ? prev + 1 : prev));
            else if (input === 'A') {
                setMode('LOG');
                setInput(null);
                onAttack(options[selectedIndex]);
            }
        } else if (mode === 'LOG') {
            if (input === 'A') {
                setInput(null);
                // If won, complete
                if (isWon) {
                    onComplete(true);
                } else {
                    // Try again loop? Or just reset menu for this simplified version
                    // If log says "Not effective", we go back to menu to try again.
                    setMode('MENU');
                }
            }
        }
    }, [input, mode, options, selectedIndex, onAttack, isWon, onComplete, setInput]);

    return (
        <div className="h-full w-full bg-white flex flex-col relative">
            {/* Top Bar - Enemy Info */}
            <div className="p-2 flex justify-between items-start">
                <div className="flex flex-col">
                    <span className="font-bold text-xs uppercase">{enemy.enemy}</span>
                    <div className="w-20 h-2 bg-gray-200 border border-gray-500 mt-1 relative">
                        <div className="absolute top-0 left-0 h-full bg-red-500 w-full animate-pulse" />
                    </div>
                </div>
                {/* Enemy Sprite Placeholder */}
                <div className="w-12 h-12 bg-gb-dark rounded-full mr-4 opacity-80"></div>
            </div>

            {/* Middle - Player Sprite (Back) */}
            <div className="flex-1 flex justify-start items-end pb-12 pl-4">
                <div className="w-16 h-16 bg-gray-400 border-2 border-gb-dark"></div>
            </div>

            {/* Bottom Menu / Dialog */}
            <div className="absolute bottom-0 w-full h-1/3 min-h-[100px] z-10">
                {mode === 'MENU' ? (
                    <div className="h-full bg-white border-t-4 border-gb-dark p-2 flex flex-col">
                        <div className="text-[10px] mb-2 font-bold">What will you do?</div>
                        <div className="grid grid-cols-2 gap-1">
                            {options.map((opt, idx) => (
                                <div key={idx} className={`text-[10px] cursor-pointer ${selectedIndex === idx ? 'bg-gb-dark text-white' : ''}`}>
                                    {selectedIndex === idx ? '> ' : '  '} {opt}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <DialogBox text={battleLog[battleLog.length - 1] || "..."} showArrow={true} />
                )}
            </div>
        </div>
    );
};
