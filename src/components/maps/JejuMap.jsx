import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../api/api";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styled/JejuMap.css";

// Leaflet 기본 아이콘 설정
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// 초기 중심 위치 설정(제주도)
const position = [33.3617, 126.5292];
const bounds = L.latLngBounds([32.9, 125.8], [33.7, 127.0]);

const predefinedHotelLocations = {
  "제주 여름그리고겨울": { lat: 33.4741, lon: 126.9111 },
  핼스테이트: { lat: 33.4896, lon: 126.4995 },
  "산림스테이 플러스 이호테우": { lat: 33.5097, lon: 126.5258 },
  산신호텔: { lat: 33.5103, lon: 126.5189 },
  "베스트 호텔": { lat: 33.4912, lon: 126.4985 },
  "썬비치 호텔": { lat: 33.3941, lon: 126.8999 },
  "데일리 풀앤스파 호텔": { lat: 33.4015, lon: 126.9203 },
  산산호텔: { lat: 33.5156, lon: 126.5123 },
  산타호텔: { lat: 33.4998, lon: 126.5291 },
  시라스테이: { lat: 33.4902, lon: 126.521 },
};

function JejuMap({ children }) {
  const [hotelLocations, setHotelLocations] = useState([]);
  const [hoveredHotel, setHoveredHotel] = useState(null);
  let hoverTimeout = null;

  useEffect(() => {
    console.log("🔍 Hovered Hotel 변경됨:", hoveredHotel);
    if (hoveredHotel) {
      console.log("🎯 적용된 호텔 이미지:", hoveredHotel.image);
    }
  }, [hoveredHotel]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get("/hotel/hotels");
        console.log("백엔드에서 받은 호텔 데이터:", response.data);

        const locations = await Promise.all(
          response.data.map(async (hotel) => {
            if (!hotel || !hotel.location) return null;

            let lat, lon;
            if (predefinedHotelLocations[hotel.name]) {
              lat = predefinedHotelLocations[hotel.name].lat;
              lon = predefinedHotelLocations[hotel.name].lon;
            } else {
              return null;
            }
            // 🚨 hotelNo가 undefined이면 콘솔에서 로그 출력
            if (!hotel.hotelNo) {
              console.error(`🚨 hotelNo가 없습니다! 호텔 데이터:`, hotel);
            }
            return {
              hotelNo: hotel.hotelNo,
              name: hotel.name,
              latitude: lat,
              longitude: lon,
              location: hotel.location,
            };
          })
        );

        setHotelLocations(locations.filter((loc) => loc !== null));

        const hotelsWithImages = await Promise.all(
          locations.map(async (hotel) => {
            console.log("🏨 호텔 데이터:", hotel); // 호텔 데이터 로그 확인

            if (!hotel.hotelNo) {
              console.error(`🚨 hotelNo가 없습니다! 호텔 데이터:`, hotel);
            }
            try {
              const imgResponse = await api.get(
                `/hotel/hotels/${hotel.hotelNo}/images`
              );
              console.log(`📦 API 응답 (${hotel.name}):`, imgResponse.data);

              const imageUrl =
                imgResponse.data?.length > 0
                  ? `${imgResponse.data[0]}?cacheBust=${new Date().getTime()}`
                  : "/images/default-hotel.jpg";

              console.log(`✅ 저장된 이미지 URL (${hotel.name}):`, imageUrl);

              return { ...hotel, image: imageUrl };
            } catch (error) {
              console.error(`❌ 이미지 로드 실패 (${hotel.name}):`, error);
              return { ...hotel, image: "/images/default-hotel.jpg" };
            }
          })
        );

        setHotelLocations(hotelsWithImages);
      } catch (error) {
        console.error("호텔 목록을 불러오는 중 오류 발생:", error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="map-container">
      <div className="map-background">
        <div className="map-wrapper">
          <MapContainer
            center={position}
            zoom={10}
            minZoom={11}
            maxZoom={16}
            maxBounds={bounds}
            maxBoundsViscosity={1.0}
            scrollWheelZoom={true}
            dragging={true}
            zoomControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {hotelLocations.map((hotel) => (
              <Marker
                key={hotel.hotelNo}
                position={[hotel.latitude, hotel.longitude]}
                icon={L.icon({
                  iconUrl:
                    hoveredHotel?.hotelNo === hotel.hotelNo
                      ? "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBA=="
                      : markerIcon,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowUrl: markerShadow,
                })}
                eventHandlers={{
                  mouseover: () => {
                    if (hoverTimeout) clearTimeout(hoverTimeout);
                    setHoveredHotel(hotel);
                  },
                  mouseout: () => {
                    hoverTimeout = setTimeout(() => {
                      setHoveredHotel(null);
                    }, 300);
                  },
                }}
              >
                <Popup>
                  <b>{hotel.name}</b>
                  <br />
                  {hotel.location}
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {hoveredHotel && (
            <div className="jejuMap-info-box">
              {console.log("📷 렌더링 중인 이미지 URL:", hoveredHotel.image)}
              <img
                src={hoveredHotel.image}
                alt={hoveredHotel.name}
                onError={(e) => {
                  console.error(
                    "❌ 이미지 로딩 실패 (onError 발생):",
                    hoveredHotel.image
                  );
                  e.target.src = "/images/default-hotel.jpg";
                }}
              />

              <p>{hoveredHotel.name}</p>
            </div>
          )}
          <div className="map-overlay">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default JejuMap;
