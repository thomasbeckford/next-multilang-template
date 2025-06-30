// app/api/location-by-ip/route.ts
import { NextRequest, NextResponse } from "next/server";

interface IPLocationResponse {
  status: string;
  lat: number;
  lon: number;
  city: string;
  country: string;
}

export async function GET(request: NextRequest) {
  try {
    // Obtener IP del usuario
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "8.8.8.8"; // Fallback para desarrollo

    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data: IPLocationResponse = await response.json();

    if (data.status === "success") {
      return NextResponse.json({
        latitude: data.lat,
        longitude: data.lon,
        city: data.city,
        country: data.country,
      });
    }

    return NextResponse.json(
      { error: "No se pudo obtener ubicación" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in location-by-ip:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
