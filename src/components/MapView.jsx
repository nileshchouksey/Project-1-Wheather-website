import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView({ lat, lon, city, defaultCountry = "India" }) {
  if (lat == null || lon == null) return null;

  const position = [lat, lon];

  return (
    <div className="rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md">
      <div className="p-4">
        <h3 className="text-xl font-semibold">Weather map</h3>
        <p className="text-white/70 text-sm">
          {city ? `Centered on ${city}` : `Default: {defaultCountry}`}
        </p>
      </div>

      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: 380, width: "100%" }}
        className="relative z-0"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{city}</p>
              <p>Lat: {lat.toFixed(3)}, Lon: {lon.toFixed(3)}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
