import { useEffect, useState } from "react";
import { fahrenheitToCelsius, useGetCity } from "./operation";

interface WeatherInfoTypes {
  rain: number[] | null;
  minTemp: number[] | null;
  maxTemp: number[] | null;
  snowfall: number[] | null;
  windSpeed: number[] | null;
  time: string[] | null;
  city: string;
  isTemperatureInF: boolean;
}

export const getLocationInfo = async (city: string) => {
  try {
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${city}&format=json&apiKey=7f1d77244f184f97a0e5704a77164c01`
      // `https://api.geoapify.com/v1/geocode/search?text=${city}&format=json&apiKey=${
      //   import.meta.env.VITE_GEO_LOCATION_API_KEY
      // }`
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const response = await res.json();
    const data = response.results[0];

    return {
      latitude: data.lat,
      longitude: data.lon,
    };
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
};

export const useWeatherInfo = () => {
  const locations = ["Kathmandu", "Pokhara", "Butwal", "Hetuda", "Janakpur"];
  const currentLocation = useGetCity({ locations, speed: 4000 });

  const [weatherInF, setWeatherInF] = useState<WeatherInfoTypes>({
    rain: null,
    minTemp: null,
    maxTemp: null,
    snowfall: null,
    windSpeed: null,
    time: null,
    city: currentLocation,
    isTemperatureInF: true,
  });
  const [weatherInC, setWeatherInC] = useState<WeatherInfoTypes>({
    rain: null,
    minTemp: null,
    maxTemp: null,
    snowfall: null,
    windSpeed: null,
    time: null,
    city: currentLocation,
    isTemperatureInF: false,
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const { latitude, longitude } = await getLocationInfo(currentLocation);
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,rain,snowfall,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const response = await res.json();
        const data = response.daily;

        setWeatherInF({
          rain: data.rain_sum,
          minTemp: data.temperature_2m_min,
          maxTemp: data.temperature_2m_max,
          snowfall: data.snowfall_sum,
          windSpeed: data.wind_speed_10m_max,
          time: data.time,
          city: currentLocation,
          isTemperatureInF: true,
        });

        setWeatherInC({
          rain: data.rain_sum,
          minTemp: data.temperature_2m_min.map((temp: number) =>
            Math.round(fahrenheitToCelsius(temp))
          ),
          maxTemp: data.temperature_2m_max.map((temp: number) =>
            Math.round(fahrenheitToCelsius(temp))
          ),
          snowfall: data.snowfall_sum,
          windSpeed: data.wind_speed_10m_max,
          time: data.time,
          city: currentLocation,
          isTemperatureInF: false,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [currentLocation]);

  return { weatherInC, weatherInF };
};
