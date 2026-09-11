import { useState, useCallback } from "react";

// Wraps the browser's Geolocation API. Doesn't touch any backend —
// just asks the browser/OS for permission and returns coordinates.
export function useGeolocation() {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Location is not supported on this browser.");
      return;
    }
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(
          err.code === 1
            ? "Location permission denied. Please allow location access to see weather."
            : "Could not get your location. Please try again."
        );
        setLoading(false);
      },
      { timeout: 10000 }
    );
  }, []);

  return { coords, loading, error, requestLocation };
}