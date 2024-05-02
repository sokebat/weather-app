import { useEffect, useState } from "react";
interface WeatherInfo {
  minTemp: number[] | null;
  maxTemp: number[] | null;
  time: string[] | null;
  isTemperatureInF: boolean;
}

interface WeatherData {
  minTemp: number;
  maxTemp: number;
  dayOfWeek: string;
  weatherCondition: string;
}

export function createWeatherData(info: WeatherInfo): WeatherData[] {
  const weatherData: WeatherData[] = [];
  if (info.minTemp && info.maxTemp && info.time) {
    for (let i = 1; i < 5; i++) {
      const minTemp = info.minTemp[i];
      const maxTemp = info.maxTemp[i];
      const dateString = info.time[i];

      const date = new Date(dateString);
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });

      const temp = Math.round((info.maxTemp[0] + info.minTemp[0]) / 2);

      const weatherCondition = getWeatherCondition(temp, info.isTemperatureInF);

      weatherData.push({
        minTemp,
        maxTemp,
        dayOfWeek,
        weatherCondition,
      });
    }
  }
  return weatherData;
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * (5 / 9);
}

export function getWeatherCondition(
  temp: number,
  isTemperatureInF: boolean
): string {
  const temperature = isTemperatureInF ? fahrenheitToCelsius(temp) : temp;

  if (temperature < 8) {
    return "Cold";
  } else if (temperature >= 8 && temperature < 20) {
    return "Mild";
  } else {
    return "Warm";
  }
}





interface TypeProps {
  locations: string[];
  speed: number;
}

export const useGetCity = ({ locations, speed }: TypeProps) => {
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setCurrentLocationIndex((prevIndex) => (prevIndex + 1) % locations.length);
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [locations, speed]);

  return locations[currentLocationIndex];
};
