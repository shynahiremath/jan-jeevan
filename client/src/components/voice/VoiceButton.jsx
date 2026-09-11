import { Mic, MicOff } from "lucide-react";

// Purely visual — takes state as props, knows nothing about the
// speech engine. This keeps it reusable anywhere in the app.
function VoiceButton({ isListening, isSupported, onClick, size = "large" }) {
  const sizeClasses = size === "large" ? "w-20 h-20 text-4xl" : "w-12 h-12 text-xl";

  if (!isSupported) {
    return (
      <button
        disabled
        className={`${sizeClasses} rounded-full bg-gray-200 text-gray-400 flex items-center justify-center cursor-not-allowed`}
        title="Voice input is not supported on this browser"
      >
        <MicOff />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label={isListening ? "Stop listening" : "Tap to speak"}
      className={`${sizeClasses} rounded-full flex items-center justify-center transition-all ${
        isListening
          ? "bg-red-500 text-white animate-pulse shadow-lg"
          : "bg-green-600 text-white hover:bg-green-700 shadow-md"
      }`}
    >
      <Mic />
    </button>
  );
}

export default VoiceButton;