import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Weather from "./Weather";
import { getLocationInfo, getWeatherInfo } from "@/utils/fetch";
import { fahrenheitToCelsius } from "@/utils/operation";
import Loading from "../Loading";

interface weatherInfoTypes {
  rain: number[] | null;
  minTemp: number[] | null;
  maxTemp: number[] | null;
  snowfall: number[] | null;
  windSpeed: number[] | null;
  time: string[] | null;
  city: string;
  isTemperatureInF: boolean;
}

const ShowWeather = () => {
  // const displayText = useTypewriter({ text: "kathmandu", speed: 100 });
  const displayText = "Pokhara";

  const [weatherInF, setweatherInF] = useState<weatherInfoTypes>({
    rain: null,
    minTemp: null,
    maxTemp: null,
    snowfall: null,
    windSpeed: null,
    time: null,
    city: displayText,
    isTemperatureInF: true,
  });
  const [weatherInC, setweatherInC] = useState<weatherInfoTypes>({
    rain: null,
    minTemp: null,
    maxTemp: null,
    snowfall: null,
    windSpeed: null,
    time: null,
    city: displayText,
    isTemperatureInF: false,
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const { latitude, longitude } = await getLocationInfo(displayText);
        const weatherInfo = await getWeatherInfo(latitude, longitude);

        setweatherInF({
          ...weatherInfo,
          city: displayText,
          isTemperatureInF: false,
        });

        setweatherInC({
          ...weatherInfo,
          minTemp: weatherInfo.minTemp.map((temp: number) =>
            Math.round(fahrenheitToCelsius(temp))
          ),
          maxTemp: weatherInfo.maxTemp.map((temp: number) =>
            Math.round(fahrenheitToCelsius(temp))
          ),
          city: displayText,
          isTemperatureInF: false,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="min-h-[100vh]  flex flex-col gap-y-6 items-center justify-center border-2 border-green-100 px-2">
      <div className="  md:w-[700px] max-w-[700px]  mx-auto bg-slate-100 shadow-md hover:shadow-lg rounded-lg p-3 shadow-slate-200 ">
        <Tabs defaultValue="Fahrenheit" className="">
          <TabsContent value="Fahrenheit">
            {weatherInF.windSpeed ? <Weather info={weatherInF} /> : <Loading />}
          </TabsContent>
          <TabsContent value="Celsius">
            {weatherInC.windSpeed ? <Weather info={weatherInC} /> : <Loading />}
          </TabsContent>

          <div className="flex items-center justify-center ">
            <TabsList className="">
              <TabsTrigger
                value="Fahrenheit"
                className=" text-xl font-semibold "
              >
                &deg;F
              </TabsTrigger>

              <TabsTrigger
                value=""
                disabled
                className=" text-xl font-semibold "
              >
                {" "}
                |{" "}
              </TabsTrigger>

              <TabsTrigger value="Celsius" className=" text-xl font-semibold ">
                C&deg;
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ShowWeather;
