import { useEffect, useState } from "react";
import { Location } from "@/types/location";

export const useGolfLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/golf-locations");
        const data = await response.json();
        setLocations(data.locations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching golf locations:", error);
        setError("Error fetching golf locations");
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return {
    golfLocations: locations,
    isPendingGolfLocations: loading,
    errorGolfLocations: error,
  };
};
