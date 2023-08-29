import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

const center = {
  lat: 36.778259,
  lng: -119.417931,
};

const MapView = () => (
  <div className="relative z-0">
    <MapContainer
      className="h-[343px] w-full"
      center={center}
      zoom={5}
      // style={{ zIndex: 0 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a  hidden href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  </div>
);

export default MapView;
