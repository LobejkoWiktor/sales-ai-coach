import { useState, useEffect, useCallback, useRef } from "react";

export const useTextToSpeech = () => {
    const [isTTSEnabled, setIsTTSEnabled] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const synthRef = useRef<SpeechSynthesis | null>(null);
    const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            synthRef.current = window.speechSynthesis;

            // Function to select the best Google voice
            const setVoice = () => {
                const voices = synthRef.current?.getVoices() || [];

                // Prioritize Google US English voices (they sound less robotic)
                const googleVoice = voices.find(voice =>
                    voice.name.includes("Google") && voice.lang.startsWith("en")
                );

                // Fallback to any English voice if Google voice not available
                const englishVoice = voices.find(voice => voice.lang.startsWith("en"));

                voiceRef.current = googleVoice || englishVoice || voices[0] || null;
            };

            // Voices might not be loaded immediately
            setVoice();

            // Some browsers load voices asynchronously
            if (synthRef.current.addEventListener) {
                synthRef.current.addEventListener("voiceschanged", setVoice);
            }

            return () => {
                if (synthRef.current?.addEventListener) {
                    synthRef.current.removeEventListener("voiceschanged", setVoice);
                }
            };
        }
    }, []);

    const speak = useCallback((text: string) => {
        if (!synthRef.current || !isTTSEnabled) return;

        // Cancel any ongoing speech
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Use the selected voice
        if (voiceRef.current) {
            utterance.voice = voiceRef.current;
        }

        // Configure speech parameters for more natural sound
        utterance.rate = 1.0; // Normal speed
        utterance.pitch = 1.0; // Normal pitch
        utterance.volume = 1.0; // Full volume

        utterance.onstart = () => {
            setIsSpeaking(true);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        utterance.onerror = (event) => {
            console.error("Speech synthesis error:", event.error);
            setIsSpeaking(false);
        };

        synthRef.current.speak(utterance);
    }, [isTTSEnabled]);

    const toggleTTS = useCallback(() => {
        setIsTTSEnabled(prev => !prev);

        // Stop any ongoing speech when disabling
        if (isTTSEnabled && synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    }, [isTTSEnabled]);

    const stopSpeaking = useCallback(() => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    }, []);

    return {
        isTTSEnabled,
        isSpeaking,
        toggleTTS,
        speak,
        stopSpeaking,
        hasSupport: !!synthRef.current,
    };
};
