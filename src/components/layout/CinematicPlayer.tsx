import React, { useEffect, useState, useRef } from 'react';

interface CinematicPlayerProps {
    src: string;
    onComplete: () => void;
    activeInput: string | null;
}

export const CinematicPlayer: React.FC<CinematicPlayerProps> = ({ src, onComplete, activeInput }) => {
    const [canSkip, setCanSkip] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // 1. Enable skipping after a grace period (e.g., 2 seconds)
    // This prevents the "Start" button press from the previous screen from immediately skipping the video.
    useEffect(() => {
        const timer = setTimeout(() => {
            setCanSkip(true);
        }, 1000); // 1 second grace period
        return () => clearTimeout(timer);
    }, []);

    // 2. Handle Skip Logic
    useEffect(() => {
        if (canSkip && activeInput && (activeInput === 'START' || activeInput === 'A')) {
            onComplete();
        }
    }, [activeInput, canSkip, onComplete]);

    // 3. Ensure proper autoplay
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.error("Cinematic playback failed:", e));
        }
    }, []);

    return (
        <div className="h-full w-full bg-black flex items-center justify-center relative">
            <video
                ref={videoRef}
                src={src}
                muted // Muted is often required for autoplay. If you want sound, we need to handle that carefully with the BGM.
                playsInline
                className="w-full h-full object-cover"
                onEnded={onComplete}
                onError={(e) => console.error("Cinematic error:", e)}
            />

            {canSkip && (
                <div className="absolute bottom-2 right-2 text-[8px] text-white/50 z-20 animate-pulse">
                    Press A to Skip
                </div>
            )}
        </div>
    );
};
