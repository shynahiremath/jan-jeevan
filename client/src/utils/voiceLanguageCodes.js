// Maps app language codes (used by react-i18next) to BCP-47 speech
// codes used by the Web Speech API.
//
// PROVIDER SWAP NOTE: this is the ONLY file that needs to change if
// we later replace the Web Speech API with Bhashini — everything
// else calls getSpeechLangCode(appLangCode) and doesn't care how
// the mapping works underneath.

const SPEECH_LANG_MAP = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
  kn: "kn-IN",
};

export function getSpeechLangCode(appLangCode) {
  return SPEECH_LANG_MAP[appLangCode] || "en-IN";
}