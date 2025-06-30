import { useEffect, useState } from "react";
import { Location, LocationData } from "@/types/location";

export const useGolfLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationsByCity, setLocationsByCity] = useState<LocationData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/golf-locations");
        const data = await response.json();

        // Group locations by city
        const grouped: LocationData = {};
        data.locations.forEach((location: Location) => {
          const city = location.name.split(",")[0].trim(); // Assuming city is the first part of the name
          if (!grouped[city]) {
            grouped[city] = [];
          }
          grouped[city].push(location);
        });

        setLocations(data.locations);
        setLocationsByCity(grouped);
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
    golfLocations: locationsByCity, // Now returns the grouped locations
    isPendingGolfLocations: loading,
    errorGolfLocations: error,
  };
};
