import { useState, useRef, useEffect, useMemo } from "react";

export default function HourlyForecast({ forecast }) {
  const [showAll, setShowAll] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  if (!forecast) return null;

  // Interpolate 3-hourly data to hourly forecasts
  const interpolateToHourly = (forecastList) => {
    const hourlyData = [];
    const now = new Date();
    now.setMinutes(0, 0, 0); // Round to current hour
    
    // Get the next 24 hours of hourly data
    for (let i = 0; i < 24; i++) {
      const targetTime = new Date(now);
      targetTime.setHours(now.getHours() + i, 0, 0, 0);
      
      // Find the closest forecast points
      let beforeIndex = -1;
      let afterIndex = -1;
      let exactMatch = false;
      
      // First, check if we have an exact match
      for (let j = 0; j < forecastList.length; j++) {
        const forecastTime = new Date(forecastList[j].dt_txt);
        forecastTime.setMinutes(0, 0, 0);
        
        if (forecastTime.getTime() === targetTime.getTime()) {
          // Exact match found
          hourlyData.push({
            ...forecastList[j],
            dt_txt: targetTime.toISOString().slice(0, 19).replace('T', ' '),
          });
          exactMatch = true;
          break;
        }
      }
      
      if (exactMatch) continue;
      
      // Find bracketing points for interpolation
      for (let j = 0; j < forecastList.length - 1; j++) {
        const currentTime = new Date(forecastList[j].dt_txt);
        const nextTime = new Date(forecastList[j + 1].dt_txt);
        
        if (targetTime >= currentTime && targetTime < nextTime) {
          beforeIndex = j;
          afterIndex = j + 1;
          break;
        }
      }
      
      // If we found bracketing points, interpolate
      if (beforeIndex >= 0 && afterIndex < forecastList.length) {
        const before = forecastList[beforeIndex];
        const after = forecastList[afterIndex];
        const beforeTime = new Date(before.dt_txt);
        const afterTime = new Date(after.dt_txt);
        
        // Calculate interpolation factor (0 to 1)
        const totalDiff = afterTime.getTime() - beforeTime.getTime();
        const targetDiff = targetTime.getTime() - beforeTime.getTime();
        const factor = totalDiff > 0 ? Math.max(0, Math.min(1, targetDiff / totalDiff)) : 0;
        
        // Determine which weather condition to use (closer to which point)
        const useBeforeWeather = factor < 0.5;
        
        // Interpolate values with smooth transitions
        const interpolated = {
          dt: Math.floor(targetTime.getTime() / 1000),
          dt_txt: targetTime.toISOString().slice(0, 19).replace('T', ' '),
          main: {
            temp: Number((before.main.temp + (after.main.temp - before.main.temp) * factor).toFixed(1)),
            feels_like: Number((before.main.feels_like + (after.main.feels_like - before.main.feels_like) * factor).toFixed(1)),
            temp_min: Number((before.main.temp_min + (after.main.temp_min - before.main.temp_min) * factor).toFixed(1)),
            temp_max: Number((before.main.temp_max + (after.main.temp_max - before.main.temp_max) * factor).toFixed(1)),
            pressure: Math.round(before.main.pressure + (after.main.pressure - before.main.pressure) * factor),
            humidity: Math.round(before.main.humidity + (after.main.humidity - before.main.humidity) * factor),
            sea_level: before.main.sea_level ? Math.round(before.main.sea_level + (after.main.sea_level - before.main.sea_level) * factor) : undefined,
            grnd_level: before.main.grnd_level ? Math.round(before.main.grnd_level + (after.main.grnd_level - before.main.grnd_level) * factor) : undefined,
          },
          weather: [useBeforeWeather ? before.weather[0] : after.weather[0]],
          clouds: {
            all: Math.round(before.clouds.all + (after.clouds.all - before.clouds.all) * factor),
          },
          wind: {
            speed: Number((before.wind.speed + (after.wind.speed - before.wind.speed) * factor).toFixed(1)),
            deg: Math.round(before.wind.deg + (after.wind.deg - before.wind.deg) * factor),
            gust: before.wind.gust && after.wind.gust ? Number((before.wind.gust + (after.wind.gust - before.wind.gust) * factor).toFixed(1)) : undefined,
          },
          visibility: before.visibility && after.visibility ? Math.round(before.visibility + (after.visibility - before.visibility) * factor) : (before.visibility || after.visibility),
          pop: Number((before.pop + (after.pop - before.pop) * factor).toFixed(2)),
          sys: {
            pod: targetTime.getHours() >= 6 && targetTime.getHours() < 18 ? 'd' : 'n',
          },
        };
        
        hourlyData.push(interpolated);
      } else if (beforeIndex === -1) {
        // If target time is before first forecast, use first forecast
        hourlyData.push({
          ...forecastList[0],
          dt_txt: targetTime.toISOString().slice(0, 19).replace('T', ' '),
        });
      } else {
        // If target time is after all forecasts, use last forecast
        const last = forecastList[forecastList.length - 1];
        hourlyData.push({
          ...last,
          dt_txt: targetTime.toISOString().slice(0, 19).replace('T', ' '),
        });
      }
    }
    
    return hourlyData;
  };

  // Generate hourly forecast data from 3-hourly data
  const allHourlyData = useMemo(() => {
    return interpolateToHourly(forecast.list);
  }, [forecast.list]);
  
  // Initially show 24 hours, then show all when expanded
  const displayedData = showAll ? allHourlyData : allHourlyData.slice(0, 24);
  const hasMoreData = allHourlyData.length > 24;

  const getTimeLabel = (dateString, index) => {
    const date = new Date(dateString);
    const now = new Date();
    
    if (index === 0 && date.toDateString() === now.toDateString()) {
      return "Now";
    }
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
    
    // Show day name if it's a different day
    if (date.toDateString() !== now.toDateString()) {
      return `${dayName} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [displayedData, showAll]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {showAll ? 'Extended Hourly Forecast' : '24-Hour Forecast'}
        </h3>
        {hasMoreData && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 border border-white/20"
          >
            {showAll ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Show Less
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Show More ({allHourlyData.length - 24} more hours)
              </>
            )}
          </button>
        )}
      </div>
      
      <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/10 shadow-lg relative">
        {/* Scroll buttons */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 shadow-lg border border-white/20"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 shadow-lg border border-white/20"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4 min-w-max">
            {displayedData.map((hour, index) => {
              const date = new Date(hour.dt_txt);
              const now = new Date();
              const isNow = index === 0 && date.toDateString() === now.toDateString();
              
              return (
                <div
                  key={`${hour.dt}-${index}`}
                  className={`flex-shrink-0 w-28 md:w-32 bg-gradient-to-br from-white/20 to-white/10 rounded-xl p-4 border ${
                    isNow 
                      ? 'border-yellow-400/50 ring-2 ring-yellow-400/30 shadow-lg' 
                      : 'border-white/10'
                  } hover:scale-105 hover:bg-white/25 transition-all duration-300 backdrop-blur-sm`}
                >
                  <div className="text-center">
                    <p className={`text-sm font-semibold mb-2 ${
                      isNow ? 'text-yellow-300' : 'text-white/90'
                    }`}>
                      {getTimeLabel(hour.dt_txt, index)}
                    </p>
                    
                    <div className="flex justify-center mb-3">
                      <img
                        src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                        alt={hour.weather[0].description}
                        className="w-16 h-16 md:w-20 md:h-20"
                      />
                    </div>
                    
                    <p className="text-2xl md:text-3xl font-bold mb-1">
                      {Math.round(hour.main.temp)}°
                    </p>
                    
                    <p className="text-xs text-white/70 mb-3 capitalize">
                      {hour.weather[0].description}
                    </p>
                    
                    <div className="space-y-2 pt-3 border-t border-white/10">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/60">💧</span>
                        <span className="text-white/80 font-medium">{hour.main.humidity}%</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/60">🌬</span>
                        <span className="text-white/80 font-medium">{hour.wind.speed} m/s</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/60">👁️</span>
                        <span className="text-white/80 font-medium">
                          {hour.visibility ? (hour.visibility / 1000).toFixed(1) : 'N/A'} km
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="flex items-center justify-center gap-1 text-xs text-white/70">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span>Feels {Math.round(hour.main.feels_like)}°</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Scroll indicator - only show when there's more content to scroll */}
        {(canScrollLeft || canScrollRight) && (
          <div className="flex justify-center mt-4">
            <p className="text-xs text-white/50 flex items-center gap-1 animate-pulse">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Scroll for more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

