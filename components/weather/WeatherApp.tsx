"use client";

import { useEffect } from "react";
import { useWeatherStore } from "@/hooks/useWeatherStore";
import { CurrentWeather } from "./CurrentWeather";
import { Forecast } from "./Forecast";
import { SearchBar } from "./SearchBar";
import { UnitToggle } from "./UnitToggle";
import { Cloud, Loader2 } from "lucide-react";

export function WeatherApp() {
  const {
    currentWeather,
    forecast,
    location,
    isLoading,
    error,
    unit,
    fetchWeather,
    getCurrentLocation,
    clearError,
  } = useWeatherStore();

  useEffect(() => {
    if (location) {
      fetchWeather(location.lat, location.lon);
    } else {
      getCurrentLocation();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Cloud className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">Weather</h1>
          </div>
          <UnitToggle />
        </header>

        <div className="mb-8">
          <SearchBar />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700 text-sm underline mt-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500">Loading weather data...</p>
          </div>
        )}

        {!isLoading && currentWeather && (
          <div className="space-y-6">
            <CurrentWeather weather={currentWeather} unit={unit} />
            {forecast && <Forecast forecast={forecast} unit={unit} />}
          </div>
        )}

        {!isLoading && !currentWeather && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Cloud className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Welcome to Weather
            </h2>
            <p className="text-gray-500 max-w-sm">
              Search for a city or allow location access to see the current weather
              and forecast.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
