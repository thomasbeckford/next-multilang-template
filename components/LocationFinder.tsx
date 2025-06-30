// components/location-finder.tsx
"use client";

import { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { findNearestLocation } from "@/lib/distance";
import { locations } from "@/data/locations";
import { Location } from "@/types/location";

export function LocationFinder() {
  const {
    location: userLocation,
    error,
    loading,
    requestPermission,
  } = useGeolocation();
  const [nearestLocation, setNearestLocation] = useState<Location | null>(null);
  const [showManualSelection, setShowManualSelection] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");

  useEffect(() => {
    if (userLocation) {
      const nearest = findNearestLocation(userLocation, locations);
      setNearestLocation(nearest);
    }
  }, [userLocation]);

  const handleManualSelection = () => {
    if (!selectedLocationId) return;

    const allLocations = Object.values(locations).flat();
    const selected = allLocations.find((loc) => loc.id === selectedLocationId);

    if (selected) {
      setNearestLocation(selected);
      setShowManualSelection(false);
    }
  };

  const cities = Object.keys(locations);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Detectando tu ubicación...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Ubicación encontrada */}
      {nearestLocation && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-green-800">
              Tu locación más cercana:
            </h3>
            {userLocation?.source === "ip" && (
              <button
                onClick={requestPermission}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
              >
                Mejorar precisión
              </button>
            )}
          </div>

          <div className="space-y-1">
            <p className="font-medium">{nearestLocation.name}</p>
            <p className="text-sm text-gray-600">{nearestLocation.address}</p>
            {nearestLocation.distance && (
              <p className="text-sm text-gray-500">
                Distancia: {nearestLocation.distance.toFixed(2)} km
                {userLocation?.source === "ip" && " (aproximada)"}
                {userLocation?.source === "gps" && " (GPS)"}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Error o sin ubicación */}
      {error && !nearestLocation && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-700 mb-4">{error}</p>

          <div className="space-y-2">
            <button
              onClick={requestPermission}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Activar GPS para mayor precisión
            </button>

            <button
              onClick={() => setShowManualSelection(!showManualSelection)}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Seleccionar manualmente
            </button>
          </div>
        </div>
      )}

      {/* Selección manual */}
      {showManualSelection && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
          <h4 className="font-medium">Selecciona tu ubicación:</h4>

          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">
              Ciudad:
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedLocationId("");
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecciona una ciudad</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {selectedCity && (
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-1"
              >
                Locación:
              </label>
              <select
                id="location"
                value={selectedLocationId}
                onChange={(e) => setSelectedLocationId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecciona una locación</option>
                {locations[selectedCity]?.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedLocationId && (
            <button
              onClick={handleManualSelection}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Confirmar selección
            </button>
          )}
        </div>
      )}

      {/* Información adicional */}
      {userLocation && (
        <div className="text-xs text-gray-500 text-center">
          Ubicación detectada vía{" "}
          {userLocation.source === "gps" ? "GPS" : "IP geolocation"}
        </div>
      )}
    </div>
  );
}
