"use client";

import { Card, CardContent } from "@/components/ui/card";
import { WeatherData } from "@/types/weather";
import { getWeatherIconUrl } from "@/lib/weather-api";
import { Droplets, Wind, Eye, Gauge } from "lucide-react";
import Image from "next/image";

interface CurrentWeatherProps {
  weather: WeatherData;
  unit: "metric" | "imperial";
}

export function CurrentWeather({ weather, unit }: CurrentWeatherProps) {
  const temp = unit === "metric" ? weather.main.temp : (weather.main.temp * 9) / 5 + 32;
  const feelsLike =
    unit === "metric"
      ? weather.main.feels_like
      : (weather.main.feels_like * 9) / 5 + 32;
  const windSpeed =
    unit === "metric"
      ? weather.wind.speed
      : weather.wind.speed * 2.237;
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const speedUnit = unit === "metric" ? "m/s" : "mph";

  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white border-0 shadow-xl">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-1">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-blue-100 capitalize mb-4">
            {weather.weather[0].description}
          </p>

          <div className="flex items-center justify-center mb-4">
            <Image
              src={getWeatherIconUrl(weather.weather[0].icon)}
              alt={weather.weather[0].description}
              width={100}
              height={100}
              className="w-24 h-24"
            />
            <span className="text-6xl font-bold ml-2">
              {Math.round(temp)}{tempUnit}
            </span>
          </div>

          <p className="text-blue-100 mb-6">
            Feels like {Math.round(feelsLike)}{tempUnit}
          </p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-200" />
              <div>
                <p className="text-xs text-blue-200">Humidity</p>
                <p className="font-semibold">{weather.main.humidity}%</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-blue-200" />
              <div>
                <p className="text-xs text-blue-200">Wind</p>
                <p className="font-semibold">
                  {Math.round(windSpeed)} {speedUnit}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-200" />
              <div>
                <p className="text-xs text-blue-200">Visibility</p>
                <p className="font-semibold">
                  {(weather.visibility / 1000).toFixed(1)} km
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-blue-200" />
              <div>
                <p className="text-xs text-blue-200">Pressure</p>
                <p className="font-semibold">{weather.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
