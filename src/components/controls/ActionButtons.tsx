import React from 'react';
import type { GameInput } from '../../hooks/useGameInput';

interface ActionButtonsProps {
    activeInput: GameInput;
    onInput: (input: GameInput) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ activeInput, onInput }) => {
    const isA = activeInput === 'A';
    const isB = activeInput === 'B';

    return (
        <div className="flex space-x-4 sm:space-x-6 items-end">
            <div className="flex flex-col items-center space-y-1">
                <button
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-b-4 border-r-2 active:border-0 border-pink-900 bg-pink-700 text-pink-900 font-bold active:translate-y-1 active:translate-x-0.5 transition-all shadow-lg ${isB ? 'translate-y-1 translate-x-0.5 shadow-none border-0' : ''}`}
                    onMouseDown={() => onInput('B')}
                    onMouseUp={() => onInput(null)}
                    onTouchStart={() => onInput('B')}
                    onTouchEnd={() => onInput(null)}
                ></button>
                <span className="text-pink-900 font-bold font-sans text-xs">B</span>
            </div>
            <div className="flex flex-col items-center space-y-1 -mt-4 sm:-mt-6">
                <button
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-b-4 border-r-2 active:border-0 border-pink-900 bg-pink-700 text-pink-900 font-bold active:translate-y-1 active:translate-x-0.5 transition-all shadow-lg ${isA ? 'translate-y-1 translate-x-0.5 shadow-none border-0' : ''}`}
                    onMouseDown={() => onInput('A')}
                    onMouseUp={() => onInput(null)}
                    onTouchStart={() => onInput('A')}
                    onTouchEnd={() => onInput(null)}
                ></button>
                <span className="text-pink-900 font-bold font-sans text-xs">A</span>
            </div>
        </div>
    );
};
