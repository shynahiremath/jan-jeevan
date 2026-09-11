import schemesData from "../data/schemesData.js";
import User from "../models/User.js";

// GET /api/schemes  (public — anyone can browse)
export const getAllSchemes = async (req, res) => {
  try {
    let matchedIds = [];

    // If a logged-in user made this request, calculate matches based on their profile
    if (req.userId) {
      const user = await User.findById(req.userId);
      if (user && user.profile) {
        const p = user.profile;
        if (p.isFarmer) matchedIds.push("pm-kisan");
        matchedIds.push("ayushman-bharat"); // broadly relevant to most citizens
        if (!p.hasOwnHouse) matchedIds.push("pmay");
        if (p.gender === "female" || p.hasDaughterUnder10) matchedIds.push("sukanya-samriddhi");
        if (p.isBusinessOwner) matchedIds.push("pm-mudra");
      }
    }

    const schemesWithMatchFlag = schemesData.map((scheme) => ({
      ...scheme,
      recommended: matchedIds.includes(scheme.id),
    }));

    res.status(200).json({ schemes: schemesWithMatchFlag });
  } catch (error) {
    console.error("Get schemes error:", error.message);
    res.status(500).json({ message: "Something went wrong loading schemes." });
  }
};