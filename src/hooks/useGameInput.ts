import { useEffect, useState } from 'react';

export type GameInput = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'A' | 'B' | 'START' | 'SELECT' | null;

export const useGameInput = () => {
    const [activeInput, setActiveInput] = useState<GameInput>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp':
                    setActiveInput('UP');
                    break;
                case 'ArrowDown':
                    setActiveInput('DOWN');
                    break;
                case 'ArrowLeft':
                    setActiveInput('LEFT');
                    break;
                case 'ArrowRight':
                    setActiveInput('RIGHT');
                    break;
                case 'z':
                case 'Z':
                case 'Enter': // Allowing Enter for A as requested (using Enter for A is common)
                    setActiveInput('A');
                    break;
                case 'x':
                case 'X':
                    setActiveInput('B');
                    break;
                case 'Backspace':
                    setActiveInput('B'); // Alternative for B
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = () => {
            setActiveInput(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return { activeInput, setActiveInput }; // Expose setActiveInput for mouse controls
};
