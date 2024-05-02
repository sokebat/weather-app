/* eslint-disable @typescript-eslint/no-unused-vars */
import { FiSun } from "react-icons/fi";
import { WiStrongWind } from "react-icons/wi";
import { RiUmbrellaFill } from "react-icons/ri";
import { GiWaterDrop } from "react-icons/gi";

interface WeatherInfo {
  city: string;
  rain: number | null;
  minTemp: number | null;
  maxTemp: number | null;
  snowfall: number | null;
  windSpeed: number | null;
}

interface Props {
  info: WeatherInfo;
}

const Weather = ({ info }: Props) => {
  const temp = Math.round((info.maxTemp + info.minTemp) / 2);

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
            {info.minTemp}&deg; / {info.maxTemp}&deg;
          </p>
        </section>
        <section className="flex flex-col items-start justify-center text-2xl gap-y-3">
          <div className=" flex gap-3  items-center justify-center">
            <WiStrongWind size={35} />

            <p>
              {info.windSpeed}
              <sub>mph</sub>
            </p>
          </div>
          <div className=" flex gap-3  items-center justify-center">
            <RiUmbrellaFill size={30} />
            <p>
              {info.rain}
              <sub></sub>
            </p>
          </div>
          <div className="flex gap-3  items-center justify-center ">
            <GiWaterDrop size={30} />
            <p>
              {" "}
              {info.snowfall}
              <sub>%</sub>
            </p>
          </div>
        </section>
      </div>
      <div className="  mx-auto  flex justify-around gap-4 p-3 mt-4  text-2xl">
        <section className=" flex flex-col justify-center items-center gap-y-3 p-1 ">
          {" "}
          <WiStrongWind size={30} />
          <p>55&deg;/ 55&deg;</p>
          <p>mon</p>{" "}
        </section>
        <section className=" flex flex-col justify-center items-center gap-y-3 p-1 ">
          {" "}
          <WiStrongWind size={35} />
          <p>55&deg;/ 55&deg;</p>
          <p>mon</p>{" "}
        </section>
        <section className=" flex flex-col justify-center items-center gap-y-3 p-1 ">
          {" "}
          <WiStrongWind size={35} />
          <p>55&deg;/ 55&deg;</p>
          <p>mon</p>{" "}
        </section>
        <section className=" flex flex-col justify-center items-center gap-y-3 p-1 ">
          {" "}
          <WiStrongWind size={35} />
          <p>55&deg;/ 55&deg;</p>
          <p>mon</p>{" "}
        </section>
      </div>
    </div>
  );
};

export default Weather;
