import React, { useEffect, useState, useRef } from 'react';

interface CinematicPlayerProps {
    src: string;
    onComplete: () => void;
    activeInput: string | null;
}

export const CinematicPlayer: React.FC<CinematicPlayerProps> = ({ src, onComplete, activeInput }) => {
    // Phases: 'INTRO_TEXT' -> 'SHUTTER_CLOSE' -> 'VIDEO' (with shutter opening)
    const [phase, setPhase] = useState<'INTRO_TEXT' | 'SHUTTER_CLOSE' | 'VIDEO'>('INTRO_TEXT');
    // For video phase
    const [canSkip, setCanSkip] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // 1. Intro Text Duration (3s)
    useEffect(() => {
        const timer = setTimeout(() => {
            setPhase('SHUTTER_CLOSE');
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // 2. Shutter Close Duration (matches animation time 0.8s) -> Switch to VIDEO
    useEffect(() => {
        if (phase === 'SHUTTER_CLOSE') {
            const timer = setTimeout(() => {
                setPhase('VIDEO');
            }, 800); // Wait for shutter close animation to finish
            return () => clearTimeout(timer);
        }
    }, [phase]);

    // 3. Enable skipping after a grace period in VIDEO phase
    useEffect(() => {
        if (phase === 'VIDEO') {
            const timer = setTimeout(() => {
                setCanSkip(true);
            }, 1000); // 1 second grace period after video starts
            return () => clearTimeout(timer);
        }
    }, [phase]);

    // 4. Handle Skip Logic (Input + Click)
    const handleSkip = () => {
        if (phase === 'VIDEO' && canSkip) {
            onComplete();
        }
    };

    useEffect(() => {
        if (phase === 'VIDEO' && canSkip && activeInput && (activeInput === 'START' || activeInput === 'A')) {
            onComplete();
        }
    }, [activeInput, canSkip, onComplete, phase]);

    // 5. Ensure proper autoplay when video becomes visible
    useEffect(() => {
        if (phase === 'VIDEO' && videoRef.current) {
            // Check if play promise is supported
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => console.error("Cinematic playback failed:", e));
            }
        }
    }, [phase]);

    return (
        <div className="h-full w-full bg-black relative overflow-hidden" onClick={handleSkip}>
            {/* Intro Text Layer */}
            {phase === 'INTRO_TEXT' && (
                <div className="absolute inset-0 flex items-center justify-center p-8 bg-black z-10">
                    <div className="text-white text-center font-press-start text-xs sm:text-sm leading-loose animate-fade-in">
                        Here is Tae's leadership journey in 30 sec video.
                    </div>
                </div>
            )}

            {/* Video Layer */}
            <div className={`absolute inset-0 ${phase === 'VIDEO' ? 'visible' : 'invisible'}`}>
                <video
                    ref={videoRef}
                    src={src}
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={onComplete}
                    onError={(e) => console.error("Cinematic error:", e)}
                />
            </div>

            {/* Shutter Overlay Layers */}
            {/* When phase becomes VIDEO, these start at closed (center) and animate open */}
            {phase === 'VIDEO' && (
                <>
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-black z-20 animate-shutter-open-top" />
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black z-20 animate-shutter-open-bottom" />
                </>
            )}

            {/* When phase is SHUTTER_CLOSE, these start at open (edges) and animate closed */}
            {phase === 'SHUTTER_CLOSE' && (
                <>
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-black z-30 animate-shutter-down" />
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black z-30 animate-shutter-up" />
                </>
            )}

            {/* Skip Hint */}
            {canSkip && phase === 'VIDEO' && (
                <div className="absolute bottom-4 right-4 text-[10px] text-white/70 z-40 animate-pulse font-press-start bg-black/50 p-2 rounded">
                    Press "A" or Tap to Skip
                </div>
            )}
        </div>
    );
};
