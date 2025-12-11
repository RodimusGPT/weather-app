import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WeatherData, ForecastData, GeoLocation } from "@/types/weather";
import {
  getCurrentWeather,
  getForecast,
  searchCity,
  reverseGeocode,
} from "@/lib/weather-api";

interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  location: GeoLocation | null;
  searchResults: GeoLocation[];
  isLoading: boolean;
  error: string | null;
  unit: "metric" | "imperial";

  setLocation: (location: GeoLocation) => void;
  fetchWeather: (lat: number, lon: number) => Promise<void>;
  searchCities: (query: string) => Promise<void>;
  getCurrentLocation: () => Promise<void>;
  toggleUnit: () => void;
  clearError: () => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      currentWeather: null,
      forecast: null,
      location: null,
      searchResults: [],
      isLoading: false,
      error: null,
      unit: "metric",

      setLocation: (location) => set({ location }),

      fetchWeather: async (lat: number, lon: number) => {
        set({ isLoading: true, error: null });
        try {
          const [weather, forecastData] = await Promise.all([
            getCurrentWeather(lat, lon),
            getForecast(lat, lon),
          ]);
          set({
            currentWeather: weather,
            forecast: forecastData,
            isLoading: false,
          });
        } catch {
          set({ error: "Failed to fetch weather data", isLoading: false });
        }
      },

      searchCities: async (query: string) => {
        if (!query.trim()) {
          set({ searchResults: [] });
          return;
        }
        try {
          const results = await searchCity(query);
          set({ searchResults: results });
        } catch {
          set({ searchResults: [] });
        }
      },

      getCurrentLocation: async () => {
        set({ isLoading: true, error: null });

        if (!navigator.geolocation) {
          set({ error: "Geolocation is not supported", isLoading: false });
          return;
        }

        try {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
              });
            }
          );

          const { latitude, longitude } = position.coords;

          const [locationData] = await reverseGeocode(latitude, longitude);

          if (locationData) {
            set({
              location: locationData,
            });
          }

          await get().fetchWeather(latitude, longitude);
        } catch {
          set({
            error: "Failed to get your location. Please search for a city.",
            isLoading: false,
          });
        }
      },

      toggleUnit: () =>
        set((state) => ({
          unit: state.unit === "metric" ? "imperial" : "metric",
        })),

      clearError: () => set({ error: null }),
    }),
    {
      name: "weather-storage",
      partialize: (state) => ({
        location: state.location,
        unit: state.unit,
      }),
    }
  )
);
