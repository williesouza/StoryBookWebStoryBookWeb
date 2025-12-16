import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage Web Speech API with optimized settings
 * for more natural-sounding speech
 */
export const useWebSpeech = () => {
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [voices, setVoices] = useState([]);

    // Load voices
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);

            // Find best Portuguese voice
            const ptVoices = availableVoices.filter(voice =>
                voice.lang.startsWith('pt-BR') || voice.lang.startsWith('pt')
            );

            if (ptVoices.length > 0) {
                console.log('✅ Found', ptVoices.length, 'Portuguese voices');
                ptVoices.forEach(v => console.log(`  - ${v.name} (${v.lang})`));
                setIsReady(true);
            } else {
                console.warn('⚠️ No Portuguese voices found, using default');
                setIsReady(true);
            }
        };

        loadVoices();

        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    // Get best Portuguese voice
    const getBestVoice = useCallback(() => {
        // Priority order for best quality voices
        const preferredVoices = [
            'Google português do Brasil',
            'Microsoft Maria',
            'Microsoft Daniel',
            'Luciana', // macOS
            'Joana', // macOS
            'Fernanda' // macOS
        ];

        for (const preferred of preferredVoices) {
            const voice = voices.find(v => v.name.includes(preferred));
            if (voice) {
                console.log(`🎤 Using preferred voice: ${voice.name}`);
                return voice;
            }
        }

        // Fallback to any Portuguese voice
        const ptVoice = voices.find(voice =>
            voice.lang.startsWith('pt-BR') || voice.lang.startsWith('pt')
        );

        if (ptVoice) {
            console.log(`🎤 Using fallback voice: ${ptVoice.name}`);
            return ptVoice;
        }

        console.log('🎤 Using default system voice');
        return null;
    }, [voices]);

    // Speak function with optimized settings
    const speak = useCallback((text, options = {}) => {
        if (!isReady) {
            console.warn('Web Speech not ready yet');
            return Promise.reject(new Error('Web Speech not ready'));
        }

        const {
            rate = 0.95, // Slightly slower for more natural sound
            pitch = 1.0,
            volume = 1.0,
            onStart,
            onEnd,
            onError
        } = options;

        return new Promise((resolve, reject) => {
            try {
                // Cancel any ongoing speech
                window.speechSynthesis.cancel();

                // Create utterance
                const utterance = new SpeechSynthesisUtterance(text);

                // Set voice
                const bestVoice = getBestVoice();
                if (bestVoice) {
                    utterance.voice = bestVoice;
                }

                // Set language
                utterance.lang = 'pt-BR';

                // Optimized settings for more natural speech
                utterance.rate = rate;
                utterance.pitch = pitch;
                utterance.volume = volume;

                // Event handlers
                utterance.onstart = () => {
                    console.log('🎤 Speech started');
                    setIsPlaying(true);
                    if (onStart) onStart();
                };

                utterance.onend = () => {
                    console.log('✅ Speech ended');
                    setIsPlaying(false);
                    if (onEnd) onEnd();
                    resolve();
                };

                utterance.onerror = (error) => {
                    console.error('❌ Speech error:', error);
                    setIsPlaying(false);
                    if (onError) onError(error);
                    reject(error);
                };

                // Speak
                window.speechSynthesis.speak(utterance);
            } catch (error) {
                console.error('❌ Error calling Web Speech:', error);
                setIsPlaying(false);
                reject(error);
            }
        });
    }, [isReady, getBestVoice]);

    // Cancel/stop function
    const cancel = useCallback(() => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
    }, []);

    // Pause function
    const pause = useCallback(() => {
        window.speechSynthesis.pause();
        setIsPlaying(false);
    }, []);

    // Resume function
    const resume = useCallback(() => {
        window.speechSynthesis.resume();
        setIsPlaying(true);
    }, []);

    return {
        isReady,
        isPlaying,
        speak,
        cancel,
        pause,
        resume,
        voices
    };
};
