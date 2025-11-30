import { useState, useEffect, useCallback, useRef } from "react";

interface UseSpeechRecognitionOptions {
    onSilenceDetected?: () => void;
    silenceThreshold?: number; // in milliseconds
}

export const useSpeechRecognition = (options?: UseSpeechRecognitionOptions) => {
    const { onSilenceDetected, silenceThreshold = 2000 } = options || {};
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [recognition, setRecognition] = useState<any>(null);
    const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const lastTranscriptRef = useRef("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            // @ts-ignore - SpeechRecognition might not be in the types yet or requires prefix
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognitionInstance = new SpeechRecognition();
                recognitionInstance.continuous = true;
                recognitionInstance.interimResults = true;
                recognitionInstance.lang = "pl-PL";

                recognitionInstance.onresult = (event: any) => {
                    let currentTranscript = "";
                    for (let i = 0; i < event.results.length; i++) {
                        currentTranscript += event.results[i][0].transcript;
                    }
                    setTranscript(currentTranscript);

                    // Reset silence timer when new speech is detected
                    if (onSilenceDetected && currentTranscript !== lastTranscriptRef.current) {
                        lastTranscriptRef.current = currentTranscript;

                        // Clear existing timer
                        if (silenceTimerRef.current) {
                            clearTimeout(silenceTimerRef.current);
                        }

                        // Only set timer if there's actual content
                        if (currentTranscript.trim()) {
                            silenceTimerRef.current = setTimeout(() => {
                                onSilenceDetected();
                            }, silenceThreshold);
                        }
                    }
                };

                recognitionInstance.onerror = (event: any) => {
                    console.error("Speech recognition error", event.error);
                    setIsListening(false);
                };

                recognitionInstance.onend = () => {
                    setIsListening(false);
                };

                setRecognition(recognitionInstance);
            }
        }

        // Cleanup timer on unmount
        return () => {
            if (silenceTimerRef.current) {
                clearTimeout(silenceTimerRef.current);
            }
        };
    }, [onSilenceDetected, silenceThreshold]);

    const startListening = useCallback(() => {
        if (recognition) {
            try {
                recognition.start();
                setIsListening(true);
                lastTranscriptRef.current = "";
            } catch (error) {
                console.error("Error starting speech recognition:", error);
            }
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);

            // Clear silence timer when stopping
            if (silenceTimerRef.current) {
                clearTimeout(silenceTimerRef.current);
                silenceTimerRef.current = null;
            }
        }
    }, [recognition]);

    const resetTranscript = useCallback(() => {
        setTranscript("");
        lastTranscriptRef.current = "";

        // Clear silence timer when resetting
        if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
        }
    }, []);

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
        hasSupport: !!recognition,
    };
};
