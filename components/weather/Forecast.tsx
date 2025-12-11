"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForecastData } from "@/types/weather";
import { getWeatherIconUrl } from "@/lib/weather-api";
import Image from "next/image";

interface ForecastProps {
  forecast: ForecastData;
  unit: "metric" | "imperial";
}

export function Forecast({ forecast, unit }: ForecastProps) {
  const dailyForecasts = forecast.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  ).slice(0, 5);

  const tempUnit = unit === "metric" ? "°C" : "°F";

  const convertTemp = (temp: number) => {
    return unit === "metric" ? temp : (temp * 9) / 5 + 32;
  };

  const formatDay = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2">
          {dailyForecasts.map((day) => (
            <div
              key={day.dt}
              className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {formatDay(day.dt_txt)}
              </p>
              <Image
                src={getWeatherIconUrl(day.weather[0].icon)}
                alt={day.weather[0].description}
                width={50}
                height={50}
                className="w-12 h-12"
              />
              <p className="text-lg font-bold">
                {Math.round(convertTemp(day.main.temp))}{tempUnit}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize truncate w-full text-center">
                {day.weather[0].main}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
