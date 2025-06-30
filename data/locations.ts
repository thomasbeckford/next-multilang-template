// data/locations.ts
import { LocationData } from "@/types/location";

export const locations: LocationData = {
  NYC: [
    {
      id: "flatiron",
      name: "Flatiron",
      city: "NYC",
      coordinates: { lat: 40.7411, lng: -73.9897 },
      address: "123 Broadway, New York, NY",
    },
    {
      id: "grand-central",
      name: "Grand Central",
      city: "NYC",
      coordinates: { lat: 40.7527, lng: -73.9772 },
      address: "89 E 42nd St, New York, NY",
    },
    {
      id: "long-island-city",
      name: "Long Island City",
      city: "NYC",
      coordinates: { lat: 40.7505, lng: -73.9356 },
      address: "456 Queens Blvd, Long Island City, NY",
    },
  ],
  Seattle: [
    {
      id: "rittenhouse",
      name: "Rittenhouse",
      city: "Seattle",
      coordinates: { lat: 47.6062, lng: -122.3321 },
      address: "789 Pine St, Seattle, WA",
    },
    {
      id: "marketsquare",
      name: "Market Square",
      city: "Seattle",
      coordinates: { lat: 47.6097, lng: -122.3331 },
      address: "321 1st Ave, Seattle, WA",
    },
  ],
  London: [
    {
      id: "lambeth",
      name: "Lambeth",
      city: "London",
      coordinates: { lat: 51.4623, lng: -0.1118 },
      address: "123 Lambeth Road, London, UK",
    },
    {
      id: "oxford",
      name: "Oxford",
      city: "London",
      coordinates: { lat: 51.75, lng: -0.1247 },
      address: "123 Oxford Road, London, UK",
    },
    {
      id: "manchester",
      name: "Manchester",
      city: "London",
      coordinates: { lat: 51.75, lng: -0.1247 },
      address: "123 Oxford Road, London, UK",
    },
  ],
};
