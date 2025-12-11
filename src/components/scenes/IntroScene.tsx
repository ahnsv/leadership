import React, { useEffect } from 'react';
import { DialogBox } from '../layout/DialogBox';
import type { GameInput } from '../../hooks/useGameInput';
import { gameData } from '../../gameData';

interface IntroSceneProps {
    step: number;
    onNextStep: () => void;
    onComplete: () => void;
    input: GameInput;
    setInput: (input: GameInput) => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ step, onNextStep, onComplete, input, setInput }) => {

    // Dialog sequence
    const dialogs = [
        "Hello there! Welcome to the world of Leadership.",
        `My name is ${gameData.hero.name}.`,
        `I define leadership as: "${gameData.hero.philosophy}"`,
        `My core values are ${gameData.hero.values.join(' and ')}.`,
        "Now, let's test your understanding.",
        "Are you ready?"
    ];

    const currentText = dialogs[step];
    const isLastStep = step >= dialogs.length - 1;

    useEffect(() => {
        if (input === 'A') {
            setInput(null); // Consume input
            if (isLastStep) {
                onComplete();
            } else {
                onNextStep();
            }
        }
    }, [input, isLastStep, onNextStep, onComplete, setInput]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-white relative">
            {/* Placeholder for Professor Oak Sprite */}
            <div className="w-32 h-32 bg-gray-300 mb-20 flex items-center justify-center border-4 border-gb-dark">
                <span className="text-[10px] text-center">PROF. OAK<br />(PLACEHOLDER)</span>
            </div>

            <DialogBox
                text={currentText}
                manualScrollInput={input === 'UP' || input === 'DOWN' ? input : null}
            />
        </div>
    );
};
