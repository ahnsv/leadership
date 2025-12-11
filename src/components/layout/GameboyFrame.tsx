import React from 'react';
import { Screen } from './Screen';
import { DPad } from '../controls/DPad';
import { ActionButtons } from '../controls/ActionButtons';
import { useGameInput } from '../../hooks/useGameInput';

interface GameboyFrameProps {
    children?: React.ReactNode;
}

export const GameboyFrame: React.FC<GameboyFrameProps> = ({ children }) => {
    const { activeInput, setActiveInput } = useGameInput();

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            {/* The Gameboy Cartridge Shadow/Depth (Behind) */}
            <div className="relative bg-gb-frame w-full max-w-[350px] sm:max-w-[400px] h-auto rounded-b-[40px] rounded-t-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_-5px_10px_rgba(0,0,0,0.2)] p-2 sm:p-5 flex flex-col border-b-8 border-r-8 border-gray-400/50">

                {/* Top Header Lines */}
                <div className="absolute top-2 left-6 right-6 h-[2px] bg-gray-400/30 flex space-x-1"></div>
                <div className="absolute top-3 left-6 right-6 h-[2px] bg-gray-400/30 flex space-x-1"></div>


                {/* Screen Area */}
                <div className="bg-gray-600/20 rounded-t-lg rounded-b-[40px] p-4 sm:p-8 flex justify-center mb-8 relative border-4 border-gray-500/10">
                    <Screen>{children}</Screen>
                </div>

                {/* Nintendo Logo area if desired */}
                <div className="mb-4 ml-4">
                    <div className="text-blue-900/40 text-xs font-bold italic tracking-wider border border-blue-900/30 rounded-full px-2 w-fit">Nintendo GAME BOY™</div>
                </div>

                {/* Controls Area */}
                <div className="flex justify-between items-center px-4 sm:px-8 mb-12">
                    <DPad activeInput={activeInput} onInput={setActiveInput} />
                    <ActionButtons activeInput={activeInput} onInput={setActiveInput} />
                </div>

                {/* Start/Select Buttons */}
                <div className="flex justify-center space-x-4 mb-8">
                    <div className="flex flex-col items-center -rotate-12">
                        <button className="w-12 h-3 bg-gray-700 rounded-full shadow-inner border border-gray-800 active:bg-gray-800"
                            onMouseDown={() => setActiveInput('SELECT')}
                            onMouseUp={() => setActiveInput(null)}
                        ></button>
                        <span className="text-[10px] text-blue-900 font-bold tracking-widest mt-1">SELECT</span>
                    </div>
                    <div className="flex flex-col items-center -rotate-12">
                        <button className="w-12 h-3 bg-gray-700 rounded-full shadow-inner border border-gray-800 active:bg-gray-800"
                            onMouseDown={() => setActiveInput('START')}
                            onMouseUp={() => setActiveInput(null)}
                        ></button>
                        <span className="text-[10px] text-blue-900 font-bold tracking-widest mt-1">START</span>
                    </div>
                </div>

                {/* Speaker Grille */}
                <div className="absolute bottom-6 right-6 flex -rotate-12 space-x-1.5 opacity-50">
                    <div className="w-2 h-10 bg-gray-800/20 rounded-full inset-shadow"></div>
                    <div className="w-2 h-10 bg-gray-800/20 rounded-full inset-shadow"></div>
                    <div className="w-2 h-10 bg-gray-800/20 rounded-full inset-shadow"></div>
                    <div className="w-2 h-10 bg-gray-800/20 rounded-full inset-shadow"></div>
                    <div className="w-2 h-10 bg-gray-800/20 rounded-full inset-shadow"></div>
                    <div className="w-2 h-10 bg-gray-800/20 rounded-full inset-shadow"></div>
                </div>

                {/* Active Input Debugger (Optional: Remove in prod) */}
                {/* <div className="absolute top-0 right-0 p-2 text-xs text-white">Input: {activeInput}</div> */}

            </div>
        </div>
    );
};
