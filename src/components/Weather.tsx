"use client";

import { useState, useEffect } from "react";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  Snowflake,
  type LucideProps,
} from "lucide-react";

interface WeatherData {
  high: number;
  low: number;
  condition: string;
}

function WeatherIcon({ condition }: { condition: string }) {
  const c = condition.toLowerCase();
  const props: LucideProps = { size: 18 };

  if (c.includes("snow") || c.includes("blizzard")) return <Snowflake {...props} />;
  if (c.includes("flurr")) return <CloudSnow {...props} />;
  if (c.includes("thunder") || c.includes("storm")) return <CloudLightning {...props} />;
  if (c.includes("rain") || c.includes("shower")) return <CloudRain {...props} />;
  if (c.includes("drizzle")) return <CloudDrizzle {...props} />;
  if (c.includes("fog") || c.includes("haz") || c.includes("mist")) return <CloudFog {...props} />;
  if (c.includes("partly")) return <CloudSun {...props} />;
  if (c.includes("cloud") || c.includes("overcast")) return <Cloud {...props} />;
  return <Sun {...props} />;
}

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Glens Falls, NY coordinates
        const pointRes = await fetch(
          "https://api.weather.gov/points/43.3095,-73.6440",
          { headers: { "User-Agent": "GlensFallsChronicle/1.0" } }
        );
        if (!pointRes.ok) return;
        const pointData = await pointRes.json();

        const forecastUrl = pointData.properties?.forecast;
        if (!forecastUrl) return;

        const forecastRes = await fetch(forecastUrl, {
          headers: { "User-Agent": "GlensFallsChronicle/1.0" },
        });
        if (!forecastRes.ok) return;
        const forecastData = await forecastRes.json();

        const periods = forecastData.properties?.periods;
        if (!periods || periods.length < 2) return;

        const daytime = periods.find(
          (p: { isDaytime: boolean }) => p.isDaytime
        );
        const nighttime = periods.find(
          (p: { isDaytime: boolean }) => !p.isDaytime
        );

        if (daytime && nighttime) {
          setWeather({
            high: daytime.temperature,
            low: nighttime.temperature,
            condition: daytime.shortForecast,
          });
        }
      } catch {
        // Silently fail — weather section won't render
      }
    }

    fetchWeather();
  }, []);

  if (!weather) return null;

  return (
    <div className="flex items-center gap-1.5 font-weather">
      <WeatherIcon condition={weather.condition} />
      <span>
        {weather.high}° / {weather.low}°F
      </span>
    </div>
  );
}
