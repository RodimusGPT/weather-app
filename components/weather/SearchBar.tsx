"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWeatherStore } from "@/hooks/useWeatherStore";
import { MapPin, Search, X } from "lucide-react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const {
    searchResults,
    searchCities,
    setLocation,
    fetchWeather,
    getCurrentLocation,
    isLoading,
  } = useWeatherStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        searchCities(query);
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchCities]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCity = async (city: typeof searchResults[0]) => {
    setLocation(city);
    await fetchWeather(city.lat, city.lon);
    setQuery("");
    setShowResults(false);
  };

  const handleGetLocation = () => {
    getCurrentLocation();
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setShowResults(true)}
            className="pl-9 pr-8"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setShowResults(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleGetLocation}
          disabled={isLoading}
          title="Use my location"
        >
          <MapPin className="w-4 h-4" />
        </Button>
      </div>

      {showResults && searchResults.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border rounded-lg shadow-lg overflow-hidden"
        >
          {searchResults.map((city, index) => (
            <button
              key={`${city.lat}-${city.lon}-${index}`}
              onClick={() => handleSelectCity(city)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 border-b last:border-b-0"
            >
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div>
                <p className="font-medium">{city.name}</p>
                <p className="text-sm text-gray-500">
                  {city.state ? `${city.state}, ` : ""}
                  {city.country}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
