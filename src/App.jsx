import { useState } from "react";
import { getWeatherData, getForecastData } from "./api";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WheatherCard";
import ForecastList from "./components/ForecastList";
import HourlyForecast from "./components/HourlyForecast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MapView from "./components/MapView";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    try {
      setError("");
      setLoading(true);
      const weatherData = await getWeatherData(city);
      const forecastData = await getForecastData(city);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message || "Failed to fetch weather data. Please try again.");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Header onNavigate={scrollToSection} onLogoClick={scrollToTop} />

      <main className="flex-1 relative z-10 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div id="home" className="text-center mb-8 scroll-mt-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Weather Forecast
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              Get accurate weather information for any city worldwide
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl border border-white/20">
            <SearchBox onSearch={handleSearch} />
            
            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
                <p className="text-white/80">Loading weather data...</p>
              </div>
            )}

            {error && !loading && (
              <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-4 mb-6 flex items-center gap-3 animate-fadeIn">
                <svg className="w-6 h-6 text-red-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-200 font-medium">{error}</p>
              </div>
            )}

            {!loading && (
              <>
                <WeatherCard weather={weather} />
                <div id="forecast" className="scroll-mt-20">
                  <HourlyForecast forecast={forecast} />
                  <ForecastList forecast={forecast} />
                </div>
                {weather && (
                  <div id="maps" className="mt-8 scroll-mt-20">
                    <MapView defaultCountry={weather.sys?.country || "United States"} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <div id="about">
        <Footer />
      </div>
    </div>
  );
}
export default App;
