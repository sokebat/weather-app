/* eslint-disable @typescript-eslint/no-unused-vars */
import { FiSun } from "react-icons/fi";
import { WiStrongWind } from "react-icons/wi";
import { RiUmbrellaFill } from "react-icons/ri";
import { GiWaterDrop } from "react-icons/gi";
import { IoCloudyNight } from "react-icons/io5";
import { WiDaySunnyOvercast } from "react-icons/wi";
import Typewriter from "typewriter-effect";

import { createWeatherData, getWeatherCondition } from "@/utils/operation";

interface WeatherInfo {
  info: {
    city: string;
    rain: number[] | null;
    minTemp: number[] | null;
    maxTemp: number[] | null;
    snowfall: number[] | null;
    windSpeed: number[] | null;
    time: string[] | null;
    isTemperatureInF: boolean;
  };
}
// interface Props {
//   info: WeatherInfo;
// }

const Weather = ({ info }: WeatherInfo) => {
  const temp =
    info.minTemp && info.maxTemp
      ? Math.round((info.maxTemp[0] + info.minTemp[0]) / 2)
      : null;

  const weatherData = createWeatherData(info);

  let weatherCondition;
  if (temp !== null) {
    weatherCondition = getWeatherCondition(temp, info.isTemperatureInF);
  }

  return (
    <div className="  ">
      <div className="text-xl sm:text-2xl   ">
        {" "}
        <div className=" flex gap-1  items-center justify-center">
          Right Now in{" "}
          <div className="font-bold">
            {" "}
            <Typewriter
              options={{
                strings: [info.city],
                autoStart: true,
                loop: false,
                deleteSpeed: 50,
              }}
            />
          </div>
          , its {weatherCondition}
        </div>{" "}
      </div>
      <div className=" flex flex-col sm:flex-row  justify-around gap-4 p-3  mt-3 ">
        <section className=" flex flex-col items-center justify-center">
          {" "}
          {weatherCondition == "Warm" ? (
            <FiSun size={100} color="orange" />
          ) : weatherCondition == "Mild" ? (
            <WiDaySunnyOvercast size={100} />
          ) : (
            <IoCloudyNight size={100} color="dark" />
          )}
        </section>
        <section className="flex flex-col items-center justify-center gap-y-2">
          <p className=" text-3xl sm:text-5xl font-semibold ">{temp}</p>
          <p className="text-xs sm:3xl font-semibold">
            {info.minTemp && info.maxTemp
              ? `${info.minTemp[0]}° / ${info.maxTemp[0]}°`
              : ""}
          </p>
        </section>
        <section className="flex flex-wrap sm:flex-col items-center  sm:items-start justify-center text-2xl gap-3">
          <div className=" flex gap-x-1 gap-y-3   items-center justify-center">
            <WiStrongWind size={30} />

            <p className="text-sm sm:2xl font-semibold">
              {info.windSpeed ? `${info.windSpeed[0]} mph` : ""}
            </p>
          </div>
          <div className=" flex gap-x-1 gap-y-3   items-center justify-center">
            <RiUmbrellaFill size={30} />

            <p className="text-sm sm:2xl font-semibold">
              {info.rain ? `${info.rain[0]} mm` : ""}
            </p>
          </div>
          <div className="flex gap-x-1 gap-y-3   items-center justify-center ">
            <GiWaterDrop size={30} />{" "}
            <p className="text-sm sm:2xl font-semibold">
              {info.snowfall ? `${info.snowfall[0]} %` : ""}
            </p>
          </div>
        </section>
      </div>
      <div className="  mx-auto  flex justify-around flex-wrap gap-4 p-3 mt-4  text-2xl">
        {weatherData.map((data, index) => (
          <section
            key={index}
            className="flex flex-col justify-center items-center gap-y-2 p-1"
          >
            {data.weatherCondition == "Warm" ? (
              <FiSun size={40} color="orange" />
            ) : data.weatherCondition == "Mild" ? (
              <WiDaySunnyOvercast size={40} />
            ) : (
              <IoCloudyNight size={40} color="dark" />
            )}

            <p className="text-sm sm:2xl font-semibold">
              {data.minTemp}&deg; / {data.maxTemp}&deg;
            </p>
            <p className="text-sm sm:2xl font-semibold"> {data.dayOfWeek}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Weather;
