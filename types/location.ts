// types/location.ts
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;
  name: string;
  city: string;
  coordinates: Coordinates;
  address: string;
  distance?: number;
}

export interface UserLocation extends Coordinates {
  source: "gps" | "ip" | "manual";
}

export interface LocationData {
  [city: string]: Location[];
}

export interface GeolocationState {
  location: UserLocation | null;
  error: string | null;
  loading: boolean;
}
