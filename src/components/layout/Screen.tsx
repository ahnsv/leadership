import React from 'react';

interface ScreenProps {
    children?: React.ReactNode;
}

export const Screen: React.FC<ScreenProps> = ({ children }) => {
    return (
        <div className="relative bg-black rounded-t-md rounded-b-xl p-8 sm:p-10 w-full aspect-[1.1] flex flex-col items-center">
            {/* The screen bezel text */}
            <div className="text-white/40 text-[10px] sm:text-xs font-bold w-full flex justify-between px-2 mb-1 font-sans tracking-widest">
                <span>DOT MATRIX WITH STEREO SOUND</span>
            </div>

            {/* Led - just for looks */}
            <div className="absolute top-8 left-2 sm:left-4 w-2 h-2 rounded-full bg-red-600 opacity-80 shadow-[0_0_5px_red]"></div>
            <div className="absolute top-8 left-6 sm:left-8 text-[8px] sm:text-[10px] text-gray-400 font-sans">BATTERY</div>

            {/* The Actual LCD Screen */}
            <div className="bg-gb-screen-bg w-full h-full shadow-inner border-4 border-gray-600/30 overflow-hidden relative">
                {/* Scanlines effect (optional, keep simple for now) */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>

                {/* Content Container */}
                <div className="relative z-0 p-2 font-press-start text-gb-dark h-full w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};
