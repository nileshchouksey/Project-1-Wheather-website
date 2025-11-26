export default function WeatherCard({ weather }) {
  if (!weather) {
    return (
      <div className="mt-8 text-center py-12">
        <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
          <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        <p className="text-white/70 text-lg">Search for a city to see the weather</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 mt-8 border border-white/20 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <h2 className="text-3xl md:text-4xl font-bold">{weather.name}</h2>
            {weather.sys?.country && (
              <span className="px-2 py-1 bg-white/20 rounded-md text-xs font-medium">
                {weather.sys.country}
              </span>
            )}
          </div>
          <p className="text-lg capitalize text-white/90 mb-4">{weather.weather[0].description}</p>
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent">
              {Math.round(weather.main.temp)}
            </span>
            <span className="text-3xl md:text-4xl font-semibold text-white/80">°C</span>
          </div>
          <p className="text-white/70 mt-2">Feels like {Math.round(weather.main.feels_like)}°C</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/20">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="w-24 h-24 md:w-32 md:h-32"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/20">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💧</span>
            <span className="text-xs text-white/60 uppercase tracking-wide">Humidity</span>
          </div>
          <p className="text-xl font-semibold">{weather.main.humidity}%</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🌬</span>
            <span className="text-xs text-white/60 uppercase tracking-wide">Wind</span>
          </div>
          <p className="text-xl font-semibold">{weather.wind.speed} m/s</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📈</span>
            <span className="text-xs text-white/60 uppercase tracking-wide">Pressure</span>
          </div>
          <p className="text-xl font-semibold">{weather.main.pressure} hPa</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">👁️</span>
            <span className="text-xs text-white/60 uppercase tracking-wide">Visibility</span>
          </div>
          <p className="text-xl font-semibold">
            {weather.visibility ? (weather.visibility / 1000).toFixed(1) : "N/A"} km
          </p>
        </div>
      </div>
    </div>
  );
}