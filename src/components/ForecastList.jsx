export default function ForecastList({ forecast }) {
  if (!forecast) return null;

  const filtered = forecast.list.filter((_, i) => i % 8 === 0).slice(0, 5);

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {filtered.map((day, i) => {
          const date = new Date(day.dt_txt);
          const isToday = i === 0 && date.toDateString() === new Date().toDateString();
          
          return (
            <div 
              key={i} 
              className={`bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-5 text-center border border-white/10 shadow-lg hover:scale-105 hover:bg-white/20 transition-all duration-300 ${
                isToday ? 'ring-2 ring-yellow-400/50' : ''
              }`}
            >
              <p className={`text-sm font-medium mb-2 ${isToday ? 'text-yellow-300 font-bold' : 'text-white/80'}`}>
                {isToday ? 'Today' : date.toLocaleDateString(undefined, { weekday: 'short' })}
              </p>
              <p className="text-xs text-white/60 mb-3">
                {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </p>
              <div className="flex justify-center mb-3">
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                  className="w-16 h-16"
                />
              </div>
              <p className="text-2xl font-bold mb-1">{Math.round(day.main.temp)}°</p>
              <div className="flex items-center justify-center gap-2 text-xs text-white/70 mt-2">
                <span className="text-red-300">↑ {Math.round(day.main.temp_max)}°</span>
                <span className="text-blue-300">↓ {Math.round(day.main.temp_min)}°</span>
              </div>
              <p className="text-xs text-white/60 mt-2 capitalize">{day.weather[0].description}</p>
              <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-white/10 text-xs text-white/60">
                <span>💧 {day.main.humidity}%</span>
                <span>🌬 {day.wind.speed}m/s</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
