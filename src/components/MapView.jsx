import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (!bounds) return;
    try {
      map.fitBounds(bounds, { padding: [20, 20] });
    } catch (e) {
      // ignore
    }
  }, [map, bounds]);
  return null;
}

export default function MapView({ defaultCountry = 'United States' }) {
  const [country, setCountry] = useState(defaultCountry);
  const [bounds, setBounds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchBounds() {
      setLoading(true);
      setError('');
      try {
        const q = encodeURIComponent(country);
        const url = `https://nominatim.openstreetmap.org/search?country=${q}&format=json&limit=1`;
        const res = await fetch(url, { headers: { 'User-Agent': 'weather-app' } });
        const json = await res.json();
        if (cancelled) return;
        if (!json || json.length === 0) {
          setError('Country not found');
          setBounds(null);
        } else {
          const bb = json[0].boundingbox; // [south, north, west, east]
          const south = parseFloat(bb[0]);
          const north = parseFloat(bb[1]);
          const west = parseFloat(bb[2]);
          const east = parseFloat(bb[3]);
          setBounds([[south, west], [north, east]]);
        }
      } catch (err) {
        setError('Failed to fetch country bounds');
        setBounds(null);
      } finally {
        setLoading(false);
      }
    }
    fetchBounds();
    return () => {
      cancelled = true;
    };
  }, [country]);

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        Interactive Map
      </h3>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-white/10">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="flex-1 w-full sm:w-auto">
            <input
              ref={inputRef}
              aria-label="Country"
              type="text"
              placeholder="Enter country name..."
              className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              defaultValue={country}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setCountry(inputRef.current.value);
                }
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => setCountry(inputRef.current.value)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-3 rounded-lg font-semibold text-white shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Loading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </span>
            )}
          </button>
        </div>
        {error && (
          <div className="mt-3 bg-red-500/20 border border-red-400/50 rounded-lg p-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20" style={{ height: 450 }}>
        <MapContainer bounds={bounds} style={{ height: '100%', width: '100%' }} zoom={5} center={[20,0]}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {bounds && <FitBounds bounds={bounds} />}
        </MapContainer>
      </div>
    </div>
  );
}
