import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { getWeatherData, getForecastData } from "./api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Docs from "./components/Docs";   // Import your Docs component
import { weatherBackgrounds } from "./components/backgrounds";

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
      setError(err.message || "Failed to fetch weather data.");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  // Smooth scroll
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      // Auto-expand API Docs if clicked
      if (sectionId === "api-docs") {
        const event = new CustomEvent("expandApiDocs");
        window.dispatchEvent(event);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const condition = weather?.weather?.[0]?.main || "Clear";
  const bgClass = weatherBackgrounds[condition] || weatherBackgrounds["Clear"];

  return (
    <div
      className={`min-h-screen flex flex-col text-white relative overflow-hidden transition-colors duration-700 ${bgClass}`}
    >
      <Router>
        <Header onNavigate={scrollToSection} onLogoClick={scrollToTop} />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                weather={weather}
                forecast={forecast}
                loading={loading}
                error={error}
                handleSearch={handleSearch}
              />
              

            }
          />
           <Route path="/docs" element={<Docs />} />   {/* ✅ Docs route */}


        </Routes>
        <Footer onNavigate={scrollToSection} />
      </Router>
    </div>
  );
}

export default App;

