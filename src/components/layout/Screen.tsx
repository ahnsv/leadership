import React from 'react';

interface ScreenProps {
    children?: React.ReactNode;
}

export const Screen: React.FC<ScreenProps> = ({ children }) => {
    return (
        <div className="relative bg-black rounded p-1 sm:p-2 w-full aspect-[1.11] flex flex-col items-center">
            {/* The Actual LCD Screen - Maximized */}
            <div className="bg-gb-screen-bg w-full h-full shadow-inner border-2 border-gray-600/30 overflow-hidden relative">
                {/* Scanlines effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>

                {/* Content Container */}
                <div className="relative z-0 p-2 font-press-start text-gb-dark h-full w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};
