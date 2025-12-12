import React, { useState, useEffect } from 'react';
import { DialogBox } from '../layout/DialogBox';
import type { GameInput } from '../../hooks/useGameInput';
import { type QuizQuestion } from '../../gameData';
// The gameData import is no longer needed as the question is passed directly
// import { gameData } from '../../gameData';

interface QuizSceneProps {
    question: QuizQuestion;
    onAnswer: (correct: boolean) => void;
    input: GameInput;
    setInput: (input: GameInput) => void;
}

export const QuizScene: React.FC<QuizSceneProps> = ({ question, onAnswer, input, setInput }) => {
    // Local state for navigation
    const [selectedOption, setSelectedOption] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        if (isAnswered) {
            if (input === 'A') {
                // Next
                setInput(null);
                setIsAnswered(false);
                setFeedback('');
                onAnswer(question.options[selectedOption] === question.answer);
                setSelectedOption(0);
            }
        } else {
            // Navigation
            if (input === 'UP') {
                setSelectedOption(prev => Math.max(0, prev - 1));
                setInput(null); // Clear input after processing
            } else if (input === 'DOWN') {
                setSelectedOption(prev => Math.min(question.options.length - 1, prev + 1));
                setInput(null); // Clear input after processing
            } else if (input === 'A') {
                // Confirm selection
                setInput(null);
                setIsAnswered(true);
                const isCorrect = question.options[selectedOption] === question.answer;
                setFeedback(isCorrect ? "Correct!" : "Not quite...");
            }
        }
    }, [input, isAnswered, question, selectedOption, onAnswer, setInput]);


    return (
        <div className="h-full w-full flex flex-col bg-white p-2 relative">
            {/* Question Area */}
            <div className="flex-1 bg-white border-b-2 border-gb-dark mb-2 text-[10px] leading-tight font-bold">
                {question.question}
            </div>

            {/* Options Area */}
            <div className="flex-1 px-8 space-y-2">
                {question.options.map((opt, idx) => (
                    <div key={idx} className={`text-[10px] sm:text-xs font-press-start flex items-center ${selectedOption === idx ? 'font-bold' : ''}`}>
                        <span className="w-4">{selectedOption === idx ? '▶' : ''}</span>
                        <span>{opt}</span>
                    </div>
                ))}
            </div>

            {isAnswered && (
                <DialogBox text={feedback} />
            )}
        </div>
    );
};
