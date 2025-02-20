// 컨텐츠 상단 영역

import "../../styled/ReserveSection.css";
import JejuMap from "../maps/JejuMap";
import ReserveForm from "../forms/ReserveForm";

function ReserveSection() {
  return (
    <section className="reserve-section">
      
      {/* 지도 섹션 */}
      <div className="hero-map">
        <div className="page-content">
          <img className="background-sea" src="/images/sea.jpg" alt="sea" />
        </div>

        {/* 지도 렌더링 */}
        <div className="page-content-placeholder">
          <div className="map-container">
            <div className="map-background">
              <div className="map-wrapper">
                <JejuMap />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 예약 폼 섹션 */}
      <div className="hero-form">
        <div className="reservation-form-container">
          <ReserveForm />
        </div>
      </div>
    </section>
  );
}

export default ReserveSection;
