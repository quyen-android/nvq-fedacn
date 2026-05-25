import { useState } from "react";
import { generateItinerary } from "../services/itineraryService";

export function useItinerary() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePlan = async (maChuyenDi) => {
    try {
      setLoading(true);
      setError("");

      const result = await generateItinerary(maChuyenDi);

      setItinerary(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    itinerary,
    loading,
    error,
    generatePlan,
  };
}