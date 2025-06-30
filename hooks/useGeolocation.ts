// hooks/use-geolocation.ts
"use client";

import { useState, useEffect } from "react";
import { GeolocationState, UserLocation } from "@/types/location";

export function useGeolocation(): GeolocationState & {
  requestPermission: () => void;
} {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    loading: true,
  });

  const getLocationByIP = async (): Promise<UserLocation | null> => {
    try {
      const response = await fetch("/api/location-by-ip");
      if (!response.ok) throw new Error("Failed to get IP location");

      const data = await response.json();
      return {
        lat: data.latitude,
        lng: data.longitude,
        source: "ip",
      };
    } catch (error) {
      console.error("Error getting location by IP:", error);
      return null;
    }
  };

  const getCurrentPosition = (): Promise<UserLocation> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalización no soportada"));
        return;
      }

      const options: PositionOptions = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 600000, // 10 minutos
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            source: "gps",
          });
        },
        reject,
        options
      );
    });
  };

  const attemptGeolocation = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // Intentar GPS primero
      const gpsLocation = await getCurrentPosition();
      setState({
        location: gpsLocation,
        error: null,
        loading: false,
      });
    } catch (gpsError) {
      console.log("GPS failed, trying IP fallback");

      // Fallback a IP
      const ipLocation = await getLocationByIP();
      if (ipLocation) {
        setState({
          location: ipLocation,
          error: null,
          loading: false,
        });
      } else {
        setState({
          location: null,
          error: "No se pudo determinar la ubicación",
          loading: false,
        });
      }
    }
  };

  useEffect(() => {
    attemptGeolocation();
  }, []);

  const requestPermission = () => {
    attemptGeolocation();
  };

  return {
    ...state,
    requestPermission,
  };
}
