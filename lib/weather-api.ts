import { WeatherData, ForecastData, GeoLocation } from "@/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

export async function getCurrentWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
}

export async function getForecast(
  lat: number,
  lon: number
): Promise<ForecastData> {
  const response = await fetch(
    `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }

  return response.json();
}

export async function searchCity(query: string): Promise<GeoLocation[]> {
  const response = await fetch(
    `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to search city");
  }

  return response.json();
}

export async function reverseGeocode(
  lat: number,
  lon: number
): Promise<GeoLocation[]> {
  const response = await fetch(
    `${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to get location name");
  }

  return response.json();
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
