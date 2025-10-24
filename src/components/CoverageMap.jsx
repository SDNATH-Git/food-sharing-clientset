import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [30, 30],
});

const CoverageMap = () => {
    // Dummy Active Food Locations
    const locations = [
        { id: 1, name: "Dhaka", lat: 23.8103, lng: 90.4125 },
        { id: 2, name: "Chittagong", lat: 22.3569, lng: 91.7832 },
        { id: 3, name: "Rajshahi", lat: 24.3745, lng: 88.6042 },
    ];

    return (
        <div className="my-12 px-5 md:px-10 z-0">
            <h2 className="text-3xl font-bold text-center mb-6">
                🌍 Coverage & Active Food Areas
            </h2>

            <MapContainer center={[23.8103, 90.4125]} zoom={7} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap'
                />

                {locations.map((loc) => (
                    <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={markerIcon}>
                        <Popup>
                            📍 <strong>{loc.name}</strong> <br />
                            Active Food Sharing Zone
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default CoverageMap;
