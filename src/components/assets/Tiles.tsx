
import React from 'react';

export const GrassTile = () => (
    <svg width="100%" height="100%" viewBox="0 0 16 16" className="w-full h-full">
        <rect width="16" height="16" fill="#9bbc0f" />
        <path d="M2 12L4 8L6 12M8 4L10 8L12 4M3 6L5 3L7 6" stroke="#0f380f" strokeWidth="1" fill="none" opacity="0.6" />
    </svg>
);

export const PlayerTile = () => (
    <svg width="100%" height="100%" viewBox="0 0 16 16" className="w-full h-full">
        {/* Simple retro "hero" sprite approximation */}
        <rect width="16" height="16" fill="none" />
        <path d="M5 2H11V5H13V7H14V11H12V14H4V11H2V7H3V5H5V2Z" fill="#0f380f" />
        <rect x="6" y="4" width="1" height="1" fill="#9bbc0f" />
        <rect x="9" y="4" width="1" height="1" fill="#9bbc0f" />
    </svg>
);

export const ObstacleTile = () => (
    <svg width="100%" height="100%" viewBox="0 0 16 16" className="w-full h-full">
        {/* A simple tree or rock */}
        <circle cx="8" cy="8" r="6" fill="#0f380f" />
        <circle cx="6" cy="6" r="2" fill="#306230" />
    </svg>
);
