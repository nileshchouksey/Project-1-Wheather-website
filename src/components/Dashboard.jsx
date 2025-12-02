import { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import SearchBox from "./SearchBox";
import ForecastList from "./ForecastList";
import HourlyForecast from "./HourlyForecast";
import MapView from "./MapView";

function Dashboard({ weather, forecast, loading, error, handleSearch }) {
  const [showDocs, setShowDocs] = useState(false);

  useEffect(() => {
    const handleExpand = () => setShowDocs(true);
    window.addEventListener("expandApiDocs", handleExpand);
    return () => window.removeEventListener("expandApiDocs", handleExpand);
  }, []);

  return (
    <main className="flex-1 relative z-10 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Home Section */}
        <div id="home" className="text-center mb-8 scroll-mt-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 
            bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent 
            dark:from-gray-100 dark:via-gray-300 dark:to-gray-400">
            Weather Forecast
          </h1>
          <p className="text-lg md:text-xl text-white/80 dark:text-gray-300">
            Get accurate weather information for any city worldwide
          </p>
        </div>

        {/* Weather Content */}
        <div className="bg-white/10 dark:bg-gray-800 backdrop-blur-xl rounded-3xl 
          p-6 md:p-8 lg:p-10 shadow-2xl border border-white/20 dark:border-gray-700">
          <SearchBox onSearch={handleSearch} />
          {loading && <p className="text-black dark:text-gray-200">Loading...</p>}
          {error && !loading && <p className="text-red-200 dark:text-red-400">{error}</p>}

          {!loading && (
            <>
              <div id="current"><WeatherCard weather={weather} /></div>
              <div id="hourly"><HourlyForecast forecast={forecast} /></div>
              <div id="forecast"><ForecastList forecast={forecast} /></div>

              {weather?.coord && (
                <div id="maps" className="mt-8 scroll-mt-20">
                  <MapView
                    lat={weather.coord.lat}
                    lon={weather.coord.lon}
                    city={weather.name}
                    defaultCountry={weather.sys?.country || "India"}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* About Section */}
        <div id="about" className="mt-12 scroll-mt-20 bg-white/10 dark:bg-gray-800 
          backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-white dark:text-gray-100">About Weather Pro</h2>
          <p className="text-white/80 dark:text-gray-300 leading-relaxed">
            Weather Pro is your trusted source for real-time forecasts, hourly updates, and interactive weather maps.
            Built with React, Tailwind, and OpenWeatherMap API, it helps you stay prepared for any conditions worldwide.
          </p>
        </div>

       {showDocs && (
  <div className="mt-6 animate-fade-in text-gray-200">
    <h2 className="text-xl font-bold">API Documentation</h2>
    <p className="mt-4">
      This is a placeholder for API docs. Visit the <code>/docs</code> route for details.
    </p>
  </div>
)}
      </div>
    </main>
  );
}

export default Dashboard;