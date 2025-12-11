import React, { useState, useEffect } from 'react';
import { DialogBox } from '../layout/DialogBox';
import type { GameInput } from '../../hooks/useGameInput';
import { gameData } from '../../gameData';

interface QuizSceneProps {
    quizIndex: number;
    onNextQuiz: (isCorrect: boolean) => void;
    onComplete: () => void;
    input: GameInput;
    setInput: (input: GameInput) => void;
}

export const QuizScene: React.FC<QuizSceneProps> = ({ quizIndex, onNextQuiz, onComplete, input, setInput }) => {
    const [selectedOption, setSelectedOption] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');

    const currentQuiz = gameData.quiz[quizIndex];

    // If we run out of quizzes, complete phase
    if (!currentQuiz) {
        useEffect(() => { onComplete() }, []);
        return null;
    }

    useEffect(() => {
        if (showFeedback) {
            if (input === 'A') {
                setInput(null);
                setShowFeedback(false);
                setFeedbackText('');
                const isCorrect = currentQuiz.options[selectedOption] === currentQuiz.answer;
                onNextQuiz(isCorrect);
                if (quizIndex + 1 >= gameData.quiz.length) {
                    onComplete();
                }
            }
            return;
        }

        if (input === 'UP') {
            setSelectedOption(prev => (prev > 0 ? prev - 1 : currentQuiz.options.length - 1));
            setInput(null);
        } else if (input === 'DOWN') {
            setSelectedOption(prev => (prev < currentQuiz.options.length - 1 ? prev + 1 : 0));
            setInput(null);
        } else if (input === 'A') {
            setInput(null);
            // Check answer
            const isCorrect = currentQuiz.options[selectedOption] === currentQuiz.answer;
            setFeedbackText(isCorrect ? "Correct! " + currentQuiz.explanation : "Not quite... " + currentQuiz.explanation);
            setShowFeedback(true);
        }
    }, [input, currentQuiz, selectedOption, showFeedback, onNextQuiz, onComplete, quizIndex, setInput]);


    return (
        <div className="h-full w-full bg-white relative flex flex-col pt-2">
            {/* Question Area */}
            <div className="px-4 text-[10px] sm:text-xs font-press-start mb-4 h-20 overflow-y-auto">
                {currentQuiz.question}
            </div>

            {/* Options Area */}
            <div className="flex-1 px-8 space-y-2">
                {currentQuiz.options.map((opt, idx) => (
                    <div key={idx} className={`text-[10px] sm:text-xs font-press-start flex items-center ${selectedOption === idx ? 'font-bold' : ''}`}>
                        <span className="w-4">{selectedOption === idx ? '▶' : ''}</span>
                        <span>{opt}</span>
                    </div>
                ))}
            </div>

            {showFeedback && (
                <DialogBox text={feedbackText} />
            )}
        </div>
    );
};
