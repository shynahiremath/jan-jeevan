import { useState, useRef, useCallback, useEffect } from "react";

// Wraps the browser's Web Speech API for Speech-to-Text.
//
// PROVIDER SWAP NOTE: this is the ONLY file that talks to the real
// recognition engine. VoiceInput only uses the interface this hook
// returns, so swapping to Bhashini later means editing just this file.
export function useSpeechRecognition(langCode) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  const SpeechRecognitionAPI =
    typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  const isSupported = !!SpeechRecognitionAPI;

  useEffect(() => {
    if (!isSupported) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = langCode;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = (event) => {
      setError(event.error || "Something went wrong with voice recognition.");
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, [isSupported, langCode, SpeechRecognitionAPI]);

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current) {
      setError("Voice input is not supported on this browser.");
      return;
    }
    setTranscript("");
    setError(null);
    try {
      recognitionRef.current.start();
    } catch (err) {
      // start() throws if already listening — safe to ignore
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) recognitionRef.current.stop();
  }, []);

  return { isSupported, isListening, transcript, error, startListening, stopListening };
}