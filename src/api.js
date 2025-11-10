import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Validate API key on module load
if (!API_KEY && import.meta.env.PROD) {
  console.error(
    "⚠️ VITE_WEATHER_API_KEY is not set. Please set your OpenWeatherMap API key in the environment variables."
  );
}

export const getWeatherData = async (city) => {
  if (!API_KEY) {
    throw new Error("API key is not configured. Please set VITE_WEATHER_API_KEY in your environment variables.");
  }

  try {
    const res = await axios.get(`${BASE_URL}/weather`, {
      params: { q: city, units: "metric", appid: API_KEY },
      timeout: 10000, // 10 second timeout
    });
    return res.data;
  } catch (err) {
    if (err.response) {
      // API returned an error response
      if (err.response.status === 401) {
        throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
      } else if (err.response.status === 404) {
        throw new Error("City not found. Please try a different city name.");
      } else if (err.response.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later.");
      } else {
        throw new Error(`Weather service error: ${err.response.status}`);
      }
    } else if (err.request) {
      // Request was made but no response received
      throw new Error("Unable to connect to weather service. Please check your internet connection.");
    } else {
      throw new Error("City not found");
    }
  }
};

export const getForecastData = async (city) => {
  if (!API_KEY) {
    throw new Error("API key is not configured. Please set VITE_WEATHER_API_KEY in your environment variables.");
  }

  try {
    const res = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, units: "metric", appid: API_KEY },
      timeout: 10000, // 10 second timeout
    });
    return res.data;
  } catch (err) {
    if (err.response) {
      // API returned an error response
      if (err.response.status === 401) {
        throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
      } else if (err.response.status === 404) {
        throw new Error("Forecast not found for this city.");
      } else if (err.response.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later.");
      } else {
        throw new Error(`Forecast service error: ${err.response.status}`);
      }
    } else if (err.request) {
      // Request was made but no response received
      throw new Error("Unable to connect to forecast service. Please check your internet connection.");
    } else {
      throw new Error("Forecast not found");
    }
  }
};
