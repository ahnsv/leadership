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
    const [isMessageVisible, setIsMessageVisible] = React.useState(false);

    // Dialog sequence
    const dialogs = [
        "Hello there! Welcome to the world of Leadership.",
        `My name is ${gameData.hero.name}.`,
        `I define leadership as: "${gameData.hero.philosophy}"`,
        `My core values are ${gameData.hero.values.join(' and ')}.`,
        "Before we go out to find a true leadership in the wild, let's test our knowledge about leadership best practices.",
        "Are you ready?"
    ];

    const currentText = dialogs[step];
    const isLastStep = step >= dialogs.length - 1;

    useEffect(() => {
        if (input === 'A') {
            setInput(null); // Consume input

            if (!isMessageVisible) {
                setIsMessageVisible(true);
            } else if (isLastStep) {
                onComplete();
            } else {
                onNextStep();
            }
        }
    }, [input, isLastStep, onNextStep, onComplete, setInput, isMessageVisible]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-white relative">
            {/* Placeholder for Professor Oak Sprite */}
            <div className="w-32 h-32 bg-gray-300 mb-20 flex items-center justify-center border-4 border-gb-dark">
                <span className="text-[10px] text-center">PROF. OAK<br />(PLACEHOLDER)</span>
            </div>

            {isMessageVisible && (
                <DialogBox
                    text={currentText}
                    manualScrollInput={input === 'UP' || input === 'DOWN' ? input : null}
                />
            )}

            {/* Overlay to prompt user to start dialog if not visible yet */}
            {!isMessageVisible && (
                <div className="absolute bottom-10 w-full text-center animate-pulse text-xs text-black">
                    PRESS A OR ENTER
                </div>
            )}
        </div>
    );
};
