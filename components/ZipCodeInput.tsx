// components/ZipCodeInput.js
import { useState } from "react";

export const ZipCodeInput = ({
  onLocationFound,
}: {
  onLocationFound: (location: {
    lat: number;
    lng: number;
    source: string;
  }) => void;
}) => {
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/geocode?zip=${zipCode}`);
      const data = await response.json();

      if (data.lat && data.lng) {
        onLocationFound({
          lat: data.lat,
          lng: data.lng,
          source: "zipcode",
        });
      }
    } catch (error) {
      console.error("Error geocoding zip:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label className="block text-sm font-medium mb-1">
          O ingresa tu código postal:
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="10001"
            className="flex-1 p-2 border rounded-md"
          />
          <button
            type="submit"
            disabled={loading || !zipCode}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "..." : "Buscar"}
          </button>
        </div>
      </div>
    </form>
  );
};
