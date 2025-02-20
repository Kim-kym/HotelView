import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../styled/JejuMap.css";

//  초기 중심 위치 설정(제주도)
const position = [33.3617, 126.5292];

const bounds = L.latLngBounds(
  [32.9, 125.8], // 남서쪽 좌표 (지도 왼쪽 아래)
  [33.7, 127.0]  // 북동쪽 좌표 (지도 오른쪽 위)
);

function JejuMap({ children }) {
  return (
    <div className="map-container">
      <div className="map-background">
        <div className="map-wrapper">
          <MapContainer
            center={position} // 초기 중심 좌표
            zoom={10} // 초기 줌 레벨
            minZoom={11} // 최소 확대 수준 (지나치게 축소되지 않도록 설정)
            maxZoom={16} // 최대 확대 수준
            maxBounds={bounds} // 축소 시 지도 경계를 설정
            maxBoundsViscosity={1.0} // 경계 밖으로 이동하지 않도록 설정
            scrollWheelZoom={true} // 마우스 스크롤 확대/축소 가능
            dragging={true} // 드래그 이동 가능

            zoomControl={false} // 기본 확대/축소 컨트롤 숨김
          >

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // 타일 이미지 url
            />
          </MapContainer>
          <div className="map-overlay">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default JejuMap;
