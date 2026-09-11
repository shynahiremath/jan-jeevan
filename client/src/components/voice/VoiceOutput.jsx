import { Volume2, Square } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";
import { getSpeechLangCode } from "../../utils/voiceLanguageCodes";

// Reusable "Listen" button — pass any text, it reads it aloud in the
// current app language. Later phases (symptom checker, crop guidance,
// scheme details) will drop this in wherever text needs to be heard.
function VoiceOutput({ text, label = "Listen" }) {
  const { i18n } = useTranslation();
  const langCode = getSpeechLangCode(i18n.language);
  const { isSupported, isSpeaking, error, speak, stop } = useSpeechSynthesis();

  if (!isSupported) return null; // fail quietly — the text is still visible on screen

  return (
    <div className="inline-flex flex-col gap-1">
      <button
        onClick={() => (isSpeaking ? stop() : speak(text, langCode))}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
          isSpeaking ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700 hover:bg-green-200"
        }`}
      >
        {isSpeaking ? <Square size={16} /> : <Volume2 size={16} />}
        {isSpeaking ? "Stop" : label}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default VoiceOutput;