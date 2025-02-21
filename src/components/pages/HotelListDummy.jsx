import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../../styled/HotelList.css";
import dummyHotels from "./DummyList"; // ✅ 올바른 경로 확인!

function HotelListDummy() {
  const [hotels, setHotels] = useState(dummyHotels); // ✅ 초기값을 바로 설정 (useEffect 불필요)
  const [loading, setLoading] = useState(false); // ✅ 로딩 상태 관리
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSort = searchParams.get("sort") || "recommend";
  const [activeSort, setActiveSort] = useState(initialSort);

  // 정렬 함수 (더미 데이터 기준으로 정렬)
  const handleSort = (sortType) => {
    let sortedHotels = [...dummyHotels]; // ✅ 기존 상태(hotels)가 아닌 원본 데이터로 정렬

    switch (sortType) {
      case "recommend":
        sortedHotels = [...dummyHotels]; // ✅ 원래 순서 유지
        break;
      case "price":
        sortedHotels.sort((a, b) => parseInt(a.price.replace(/,/g, "")) - parseInt(b.price.replace(/,/g, "")));
        break;
      case "rating":
        sortedHotels.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setHotels(sortedHotels); // ✅ 정렬된 데이터 업데이트
    setActiveSort(sortType);
    setSearchParams({ sort: sortType });
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="hotel-list-container">
      <div className="hotel-list-background">
        <img src="/images/sea.jpg" alt="sea" />
      </div>

      <div className="hotel-list-wrapper">
        <div className="hotel-list-sortBar-box">
          <div className="hotel-list-sortBar-wrapper">
            <div className={`hotel-list-sortBar-button ${activeSort === "recommend" ? "active" : ""}`} role="button" onClick={() => handleSort("recommend")}>
              자쿠과 추천
            </div>
            <div className={`hotel-list-sortBar-button ${activeSort === "price" ? "active" : ""}`} role="button" onClick={() => handleSort("price")}>
              예약가 낮은 순
            </div>
            <div className={`hotel-list-sortBar-button ${activeSort === "rating" ? "active" : ""}`} role="button" onClick={() => handleSort("rating")}>
              후기 좋은 순
            </div>
          </div>
        </div>

        <div className="hotel-list">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-box">
              <Link to={`/hotels/${hotel.id}`}>
                <div className="hotel-box-background">
                  <img className="hotel-image" src={hotel.image} alt={`호텔 ${hotel.name}`} />
                  <div className="hotel-info">
                    <h2>{hotel.name}</h2>
                    <p>{hotel.address}</p>
                  </div>
                  <div className="hotel-price">
                    <p>₩ {hotel.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotelListDummy;
