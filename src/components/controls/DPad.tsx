import React from 'react';
import type { GameInput } from '../../hooks/useGameInput';

interface DPadProps {
    activeInput: GameInput;
    onInput: (input: GameInput) => void;
}

export const DPad: React.FC<DPadProps> = ({ activeInput, onInput }) => {
    const isUp = activeInput === 'UP';
    const isDown = activeInput === 'DOWN';
    const isLeft = activeInput === 'LEFT';
    const isRight = activeInput === 'RIGHT';

    return (
        <div className="relative w-24 h-24 sm:w-28 sm:h-28">
            <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-gray-800 rounded-l hover:bg-gray-700 cursor-pointer shadow-md active:translate-y-0.5 active:shadow-none transition-transform"
                onMouseDown={() => onInput('LEFT')}
                onMouseUp={() => onInput(null)}
                onTouchStart={() => onInput('LEFT')}
                onTouchEnd={() => onInput(null)}
                style={{ transform: isLeft ? 'scale(0.95)' : 'none', backgroundColor: isLeft ? '#374151' : undefined }}
            ></div>
            <div className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-gray-800 rounded-r hover:bg-gray-700 cursor-pointer shadow-md active:translate-y-0.5 active:shadow-none transition-transform"
                onMouseDown={() => onInput('RIGHT')}
                onMouseUp={() => onInput(null)}
                onTouchStart={() => onInput('RIGHT')}
                onTouchEnd={() => onInput(null)}
                style={{ transform: isRight ? 'scale(0.95)' : 'none', backgroundColor: isRight ? '#374151' : undefined }}
            ></div>
            <div className="absolute top-0 left-1/3 w-1/3 h-1/3 bg-gray-800 rounded-t hover:bg-gray-700 cursor-pointer shadow-md active:translate-y-0.5 active:shadow-none transition-transform"
                onMouseDown={() => onInput('UP')}
                onMouseUp={() => onInput(null)}
                onTouchStart={() => onInput('UP')}
                onTouchEnd={() => onInput(null)}
                style={{ transform: isUp ? 'scale(0.95)' : 'none', backgroundColor: isUp ? '#374151' : undefined }}
            ></div>
            <div className="absolute bottom-0 left-1/3 w-1/3 h-1/3 bg-gray-800 rounded-b hover:bg-gray-700 cursor-pointer shadow-md active:translate-y-0.5 active:shadow-none transition-transform"
                onMouseDown={() => onInput('DOWN')}
                onMouseUp={() => onInput(null)}
                onTouchStart={() => onInput('DOWN')}
                onTouchEnd={() => onInput(null)}
                style={{ transform: isDown ? 'scale(0.95)' : 'none', backgroundColor: isDown ? '#374151' : undefined }}
            ></div>
            {/* Center piece to smooth it out */}
            <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-gray-800"></div>
        </div>
    );
};
