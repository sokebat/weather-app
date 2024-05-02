import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Weather from "./Weather";
import { useWeatherInfo } from "@/utils/fetch";

import Loading from "../Loading";

const ShowWeather = () => {
  const weatherInfo = useWeatherInfo();
  const { weatherInC, weatherInF } = weatherInfo;
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
