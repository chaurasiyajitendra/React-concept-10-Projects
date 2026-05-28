import { useEffect, useState } from "react";
import {
  CloudSun,
  Search,
  Wind,
  Droplets,
  Thermometer,
  MapPin,
} from "lucide-react";

const WeatherDashboard = () => {

  const [city, setCity] = useState("Ahmedabad");

  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(false);

  // Fetch Weather
  async function fetchWeather(cityName = city) {

    try {

      setLoading(true);

      // 1. Get City Coordinates
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
      );

      const geoData = await geoResponse.json();

      if (!geoData.results) {
        alert("City not found");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } =
        geoData.results[0];

      // 2. Fetch Weather
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );

      const weatherData = await weatherResponse.json();

      setWeather({
        city: name,
        country,
        temperature:
          weatherData.current_weather.temperature,
        windspeed:
          weatherData.current_weather.windspeed,
        weathercode:
          weatherData.current_weather.weathercode,
      });

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-6">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="mb-10">
          
          <h1 className="text-5xl font-bold mb-3">
            Weather Dashboard
          </h1>

          <p className="text-slate-400 text-lg">
            Real-time weather using free API
          </p>
        </div>

        {/* Search */}
        <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-5 flex gap-4 mb-8 backdrop-blur-lg">
          
          <input
            type="text"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            placeholder="Search city..."
            className="flex-1 bg-slate-800 border border-slate-700 px-5 py-4 rounded-2xl outline-none focus:border-white text-lg"
          />

          <button
            onClick={() => fetchWeather()}
            className="bg-white text-black px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:scale-105 transition"
          >
            <Search size={20} />
            Search
          </button>
        </div>

        {/* Weather Card */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          
          {/* Left */}
          <div className="bg-slate-900/80 border border-slate-700 rounded-[32px] p-8 backdrop-blur-lg">
            
            {loading ? (
              <div className="h-[400px] flex items-center justify-center text-2xl">
                Loading...
              </div>
            ) : (
              <>
                {/* Top */}
                <div className="flex items-center justify-between mb-12">
                  
                  <div>
                    <div className="flex items-center gap-3 text-slate-300 mb-4">
                      
                      <MapPin size={22} />

                      <p className="text-xl">
                        {weather?.city},{" "}
                        {weather?.country}
                      </p>
                    </div>

                    <h2 className="text-8xl font-bold">
                      {weather?.temperature}°
                    </h2>

                    <p className="text-slate-400 text-lg mt-4">
                      Current Temperature
                    </p>
                  </div>

                  <div className="bg-slate-800 p-8 rounded-full">
                    <CloudSun size={100} />
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-3 gap-5">
                  
                  {/* Wind */}
                  <div className="bg-slate-800 rounded-3xl p-6">
                    
                    <div className="bg-slate-700 w-fit p-3 rounded-2xl mb-5">
                      <Wind size={24} />
                    </div>

                    <p className="text-slate-400 mb-2">
                      Wind Speed
                    </p>

                    <h3 className="text-3xl font-bold">
                      {weather?.windspeed}
                    </h3>

                    <p className="text-slate-500 mt-1">
                      km/h
                    </p>
                  </div>

                  {/* Humidity */}
                  <div className="bg-slate-800 rounded-3xl p-6">
                    
                    <div className="bg-slate-700 w-fit p-3 rounded-2xl mb-5">
                      <Droplets size={24} />
                    </div>

                    <p className="text-slate-400 mb-2">
                      Humidity
                    </p>

                    <h3 className="text-3xl font-bold">
                      64%
                    </h3>

                    <p className="text-slate-500 mt-1">
                      Moderate
                    </p>
                  </div>

                  {/* Feels Like */}
                  <div className="bg-slate-800 rounded-3xl p-6">
                    
                    <div className="bg-slate-700 w-fit p-3 rounded-2xl mb-5">
                      <Thermometer size={24} />
                    </div>

                    <p className="text-slate-400 mb-2">
                      Feels Like
                    </p>

                    <h3 className="text-3xl font-bold">
                      {weather?.temperature}°
                    </h3>

                    <p className="text-slate-500 mt-1">
                      Warm
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6">
            
            {/* Forecast Cards */}
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-slate-900/80 border border-slate-700 rounded-3xl p-6 flex items-center justify-between backdrop-blur-lg"
              >
                
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    Day {item}
                  </h3>

                  <p className="text-slate-400">
                    Sunny Weather
                  </p>
                </div>

                <div className="text-right">
                  
                  <CloudSun size={42} />

                  <h2 className="text-3xl font-bold mt-3">
                    {30 + item}°
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;