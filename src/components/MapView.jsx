import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Default marker fix (Leaflet’s default icons may not show without this in bundlers)
const DefaultIcon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function FlyTo({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 10, { duration: 1.0 });
  }, [coords, map]);
  return null;
}

export default function MapView({ lat, lon, city, defaultCountry = "India" }) {
  const [center, setCenter] = useState([11.8745, 75.3704]); // Kannur default
  const hasCoords = lat != null && lon != null;

  const initialCenter = useMemo(() => {
    return hasCoords ? [lat, lon] : center;
  }, [hasCoords, lat, lon, center]);

  useEffect(() => {
    if (hasCoords) setCenter([lat, lon]);
  }, [hasCoords, lat, lon]);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md">
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Weather map</h3>
          <p className="text-white/70 text-sm">
            {city ? `Centered on ${city}` : `Default: ${defaultCountry}`}
          </p>
        </div>
      </div>

      <MapContainer
        center={initialCenter}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: 380, width: "100%" }}
        className="relative z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hasCoords && (
          <>
            <FlyTo coords={[lat, lon]} />
            <Marker position={[lat, lon]}>
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{city}</p>
                  <p>Lat: {lat.toFixed(3)}, Lon: {lon.toFixed(3)}</p>
                </div>
              </Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
}