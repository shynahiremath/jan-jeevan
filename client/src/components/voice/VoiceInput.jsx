import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import VoiceButton from "./VoiceButton";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import { getSpeechLangCode } from "../../utils/voiceLanguageCodes";

// Reusable voice input: mic button + live transcript.
// Calls onResult(text) once listening stops with a final transcript.
function VoiceInput({ onResult }) {
  const { i18n } = useTranslation();
  const langCode = getSpeechLangCode(i18n.language);

  const { isSupported, isListening, transcript, error, startListening, stopListening } =
    useSpeechRecognition(langCode);

  useEffect(() => {
    if (!isListening && transcript && onResult) {
      onResult(transcript);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

  return (
    <div className="flex flex-col items-center gap-3">
      <VoiceButton
        isListening={isListening}
        isSupported={isSupported}
        onClick={isListening ? stopListening : startListening}
      />
      <p className="text-sm text-gray-500">{isListening ? "Listening..." : "Tap to speak"}</p>
      {transcript && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-700 text-center max-w-md">
          {transcript}
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!isSupported && (
        <p className="text-sm text-orange-600 text-center max-w-xs">
          Voice input isn't supported on this browser. Try Chrome on Android or desktop.
        </p>
      )}
    </div>
  );
}

export default VoiceInput;