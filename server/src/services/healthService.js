const URGENT = new Set(["Breathing difficulty", "Chest pain"]);
const MODERATE = new Set(["Fever", "Diarrhea", "Vomiting", "Weakness"]);

export function screenSymptoms(symptoms = []) {
  const list = Array.isArray(symptoms) ? symptoms.filter(Boolean) : [];
  if (list.length === 0) {
    return { level: "none", advice: "Please select at least one symptom.", symptoms: [] };
  }

  const urgent = list.some((s) => URGENT.has(s));
  const moderate = list.some((s) => MODERATE.has(s));

  let level = "mild";
  let advice =
    "Rest, fluids, and basic care. See a doctor if symptoms worsen in 48 hours.";

  if (urgent) {
    level = "urgent";
    advice = "Seek emergency care immediately (call 108). Do not wait.";
  } else if (moderate) {
    level = "moderate";
    advice = "Visit nearest PHC / clinic today. Stay hydrated and monitor symptoms.";
  }

  return {
    level,
    advice,
    symptoms: list,
    disclaimer: "This is not a medical diagnosis. Consult a qualified health worker for serious concerns.",
  };
}

export function getLocalAlerts(district = "") {
  return {
    district: district || "your district",
    alerts: [
      {
        id: "seasonal-fever",
        title: "Seasonal viral fever",
        severity: "watch",
        message:
          "Increased cases of viral fever reported in nearby blocks. Use mosquito nets, avoid stagnant water, and seek care early if fever lasts more than 2 days.",
      },
    ],
    tips: [
      "Drink clean / boiled water during monsoon.",
      "Complete the full course of any medicine given by the doctor.",
      "Keep ORS packets ready for diarrhea season.",
      "Pregnant women: do not miss ANC check-ups at ASHA / PHC.",
    ],
  };
}
