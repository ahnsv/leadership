import React, { useState, useEffect } from 'react';

interface DialogBoxProps {
    text: string;
    onComplete?: () => void;
    showArrow?: boolean;
    manualScrollInput?: 'UP' | 'DOWN' | null; // Receive input for manual scrolling
}

export const DialogBox: React.FC<DialogBoxProps> = ({ text, onComplete, showArrow = true, manualScrollInput }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    // Given user request for "scrolling with arrow key", let's enable overflow scrolling.
    const textRef = React.useRef<HTMLDivElement>(null);

    // Handle manual scrolling
    useEffect(() => {
        if (!textRef.current) return;
        if (manualScrollInput === 'DOWN') {
            textRef.current.scrollTop += 10;
        } else if (manualScrollInput === 'UP') {
            textRef.current.scrollTop -= 10;
        }
    }, [manualScrollInput]);

    useEffect(() => {
        setDisplayedText('');
        setIsTyping(true);
        let index = 0;

        const timer = setInterval(() => {
            index++;
            if (index <= text.length) {
                setDisplayedText(text.slice(0, index));
                // Auto-scroll to bottom as we type
                if (textRef.current) {
                    textRef.current.scrollTop = textRef.current.scrollHeight;
                }
            } else {
                clearInterval(timer);
                setIsTyping(false);
                if (onComplete) onComplete();
            }
        }, 20); // Slightly faster typing

        return () => clearInterval(timer);
    }, [text]);

    return (
        <div className="absolute bottom-0 left-0 right-0 h-2/5 min-h-[140px] bg-white border-t-4 border-gb-dark p-2 font-press-start text-gb-dark text-[10px] sm:text-xs leading-relaxed z-10">
            <div className="border-2 border-gb-dark h-full p-2 relative flex flex-col">
                <div ref={textRef} className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
                    {displayedText}
                </div>
                {!isTyping && showArrow && (
                    <div className="absolute bottom-2 right-2 animate-bounce text-red-600">▼</div>
                )}
            </div>
        </div>
    );
};
