/* eslint-disable @typescript-eslint/no-unused-vars */
import { FiSun } from "react-icons/fi";
import { WiStrongWind } from "react-icons/wi";
import { RiUmbrellaFill } from "react-icons/ri";
import { GiWaterDrop } from "react-icons/gi";

interface WeatherInfo {
 info:{
  city: string;
  rain: number[] | null;
  minTemp: number[] | null;
  maxTemp: number[] | null;
  snowfall: number[] | null;
  windSpeed: number[] | null;
  time: string[] | null;
 }
}
// interface Props {
//   info: WeatherInfo;
// }

const Weather = ({ info }: WeatherInfo) => {
  const temp =
    info.minTemp && info.maxTemp
      ? Math.round((info.maxTemp[0] + info.minTemp[0]) / 2)
      : null;

  const weatherData = [];

  if (info.minTemp && info.maxTemp && info.time) {
    for (let i = 1; i < 5; i++) {
      const minTemp = info.minTemp[i];
      const maxTemp = info.maxTemp[i];
      const dateString = info.time[i];

      const date = new Date(dateString);
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });

      weatherData.push({
        minTemp,
        maxTemp,
        dayOfWeek,
      });
    }
  }

  return (
    <div className="  ">
      <div className=" text-xl text-center">
        {" "}
        <p>Right Now in {info.city}, its Clear</p>{" "}
      </div>
      <div className=" flex  justify-around gap-4 p-3  mt-3 ">
        <section className=" flex flex-col items-center justify-center">
          {" "}
          <FiSun size={100} />
        </section>
        <section className="flex flex-col items-center justify-center gap-y-2">
          <p className="text-7xl font-semibold ">{temp}</p>
          <p className=" text-xl  ">
            {info.minTemp && info.maxTemp
              ? `${info.minTemp[0]}° / ${info.maxTemp[0]}°`
              : ""}
          </p>
        </section>
        <section className="flex flex-col items-start justify-center text-2xl gap-y-3">
          <div className=" flex gap-3  items-center justify-center">
            <WiStrongWind size={35} />

            <p>
              <p>{info.windSpeed ? `${info.windSpeed[0]} mph` : ""}</p>
            </p>
          </div>
          <div className=" flex gap-3  items-center justify-center">
            <RiUmbrellaFill size={30} />
            <p>
              <p>{info.rain ? `${info.rain[0]} mm` : ""}</p>
            </p>
          </div>
          <div className="flex gap-3  items-center justify-center ">
            <GiWaterDrop size={30} />
            <p>
              {" "}
              <p>{info.snowfall ? `${info.snowfall[0]} %` : ""}</p>
            </p>
          </div>
        </section>
      </div>
      <div className="  mx-auto  flex justify-around gap-4 p-3 mt-4  text-2xl">
        {weatherData.map((data, index) => (
          <section
            key={index}
            className="flex flex-col justify-center items-center gap-y-2 p-1"
          >
            <WiStrongWind size={30} />

            <p className="text-xl">
              {data.minTemp}&deg; / {data.maxTemp}&deg;
            </p>
            <p className="text-xl"> {data.dayOfWeek}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Weather;
