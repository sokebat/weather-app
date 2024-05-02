export const getLocationInfo = async (city: string) => {
  try {
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${city}&format=json&apiKey=7f1d77244f184f97a0e5704a77164c01`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
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

export const getWeatherInfo = async (latitude: number, longitude: number) => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,rain,snowfall,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    );

    const response = await res.json();
    const data = response.daily;
    console.log(response);

    return {
      rain: data.rain_sum,
      minTemp: data.temperature_2m_min,
      maxTemp: data.temperature_2m_max,
      snowfall: data.snowfall_sum,
      windSpeed: data.wind_speed_10m_max,
      time:data.time
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
