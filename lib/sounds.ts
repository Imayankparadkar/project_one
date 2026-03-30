"use client";

/**
 * Utility to play notification and message sounds.
 * Sounds should be placed in the /public/sounds/ directory.
 */
export const playSound = (type: 'message' | 'notification') => {
    // Check if sound is enabled in localStorage (matching the settings toggle)
    const isSoundEnabled = localStorage.getItem('sound-effects-enabled') !== 'false';
    
    if (!isSoundEnabled) return;

    try {
        const audioPath = type === 'message' ? '/sounds/message.mp3' : '/sounds/notification.mp3';
        const audio = new Audio(audioPath);
        audio.play().catch(err => {
            console.warn(`Sound playback failed for ${type}:`, err);
        });
    } catch (error) {
        console.error("Error playing sound:", error);
    }
};
