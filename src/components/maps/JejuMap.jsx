import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../styled/JejuMap.css";

//  초기 중심 위치 설정(제주도)
const position = [33.3617, 126.5292];

function JejuMap({ children }) {
  return (
    <div className="map-container">
      <div className="map-background">
        <div className="map-wrapper">
          <MapContainer
            center={position} //  초기 중심 좌표
            zoom={11} //  초기 줌 레벨
            style={{
              width: "100%",
              height: "100%",
            }}
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
