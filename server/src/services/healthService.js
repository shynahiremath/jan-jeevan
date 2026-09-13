const URGENT = new Set(["Breathing difficulty", "Chest pain"]);
const MODERATE = new Set(["Fever", "Diarrhea", "Vomiting", "Weakness"]);

export function screenSymptoms(symptoms = []) {
  const list = Array.isArray(symptoms) ? symptoms.filter(Boolean) : [];
  if (!list.length) {
    return { level: "none", advice: "Please select at least one symptom.", symptoms: [] };
  }

  const urgent = list.some((s) => URGENT.has(s));
  const moderate = list.some((s) => MODERATE.has(s));

  let level = "mild";
  let advice = "Rest, fluids, and basic care. See a doctor if symptoms worsen in 48 hours.";
  let nextSteps = [
    "Drink clean water / ORS if weak.",
    "Note temperature twice a day.",
    "Avoid self-medication with strong antibiotics.",
  ];

  if (urgent) {
    level = "urgent";
    advice = "Seek emergency care immediately (call 108). Do not wait at home.";
    nextSteps = [
      "Call 108 or go to the nearest emergency facility now.",
      "Keep the patient sitting upright if breathing is hard.",
      "Do not give food if chest pain is severe — wait for medical advice.",
    ];
  } else if (moderate) {
    level = "moderate";
    advice = "Visit nearest PHC / clinic today. Stay hydrated and monitor symptoms.";
    nextSteps = [
      "Visit PHC / ASHA / local clinic within today.",
      "ORS for diarrhea; paracetamol only as labelled for fever.",
      "Return sooner if fever is very high, blood in stool, or confusion.",
    ];
  }

  if (list.includes("Fever")) nextSteps.push("Use a damp cloth on forehead; light clothing.");
  if (list.includes("Diarrhea") || list.includes("Vomiting")) nextSteps.push("Small sips of ORS often — not large amounts at once.");

  return {
    level,
    advice,
    nextSteps,
    symptoms: list,
    disclaimer: "Not a medical diagnosis. For emergencies always call 108.",
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
          "Increased viral fever in nearby blocks. Use mosquito nets, clear stagnant water, seek care if fever lasts more than 2 days.",
      },
      {
        id: "water",
        title: "Water safety",
        severity: "info",
        message: "Boil or filter drinking water during monsoon. Wash hands before meals.",
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
