// 컨텐츠 상단 영역

import "../../styled/ReserveSection.css";

function Content() {
  return (
    <section className="hero">
      <div className="page-content">
        <img className="background-sea" src="/images/sea.jpg" alt="sea" />
        {/* <img className="jeju-map" src="/images/jeju_map.jpg" alt="map" /> */}
      </div>
      <div className="reserve-form">
        <div className="reserve-form-wrapper">
          <div className="reserve-search">
            <div className="reserve-search-box">
              <div className="search-icon"></div>
              <div className="search-text">
                <input
                  className="search-input"
                  type="text"
                  placeholder="어디로 가시나요"
                ></input>
              </div>
            </div>
            <div className="reserve-date-box">
              <div className="checkin-date">체크인</div>
              <div className="checkout-date">체크아웃</div>
            </div>
            <div className="reserve-occupancy-box">
              <div className="select-occupancy">성인 1</div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-content-placeholder"></div>
    </section>
  );
}

export default Content;
