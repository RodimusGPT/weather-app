"use client";

import { Button } from "@/components/ui/button";
import { useWeatherStore } from "@/hooks/useWeatherStore";

export function UnitToggle() {
  const { unit, toggleUnit } = useWeatherStore();

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      <Button
        variant={unit === "metric" ? "default" : "ghost"}
        size="sm"
        onClick={() => unit !== "metric" && toggleUnit()}
        className="text-sm px-3"
      >
        °C
      </Button>
      <Button
        variant={unit === "imperial" ? "default" : "ghost"}
        size="sm"
        onClick={() => unit !== "imperial" && toggleUnit()}
        className="text-sm px-3"
      >
        °F
      </Button>
    </div>
  );
}
