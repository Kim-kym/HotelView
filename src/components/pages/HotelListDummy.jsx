import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../../styled/HotelList.css";
import api from "../api/api";

function HotelListDummy() {
  const [hotels, setHotels] = useState([]);
  const [searchParams] = useSearchParams();
  const initialSort = searchParams.get("sort") || "recommend";
  const [activeSort, setActiveSort] = useState(initialSort);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ✅ API 호출하여 호텔 데이터 가져오기
    api
      .get("/hotel/hotels")
      .then((response) => {
        setHotels(response.data); // ✅ 상태 업데이트
        setLoading(false);
      })
      .catch((error) => {
        console.error("호텔 데이터를 불러오는 중 오류 발생:", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, []);

  // 정렬 함수
  const handleSort = (sortType) => {
    let sortedHotels = [...hotels];

    switch (sortType) {
      case "recommend":
        sortedHotels = [...hotels]; // 기본 추천 순
        break;
      // ✅ 스프링 부트에 가격 필드 넣기 전까지 주석 처리
      // case "price":
      //   sortedHotels.sort((a, b) => {
      //     const priceA = parseInt(a.price.replace(/,/g, ""));
      //     const priceB = parseInt(b.price.replace(/,/g, ""));
      //     return priceA - priceB;
      //   });
      //   break;
      case "rating":
        sortedHotels.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setHotels(sortedHotels);
    setActiveSort(sortType);
  };

  if (loading) return <p>호텔 정보를 불러오는 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="hotel-list-container">
      {/* 배경 이미지 */}
      <div className="hotel-list-background">
        <img src="/images/sea.jpg" alt="sea" />
      </div>

      <div className="hotel-list-sortBar-box">
        <div className="hotel-list-sortBar-wrapper">
          <div
            className={`hotel-list-sortBar-button ${
              activeSort === "recommend" ? "active" : ""
            }`}
            role="button"
            onClick={() => handleSort("recommend")}
          >
            자쿠과 추천
          </div>
          <div
            className={`hotel-list-sortBar-button ${
              activeSort === "price" ? "active" : ""
            }`}
            role="button"
            onClick={() => handleSort("price")}
          >
            예약가 낮은 순
          </div>
          <div
            className={`hotel-list-sortBar-button ${
              activeSort === "rating" ? "active" : ""
            }`}
            role="button"
            onClick={() => handleSort("rating")}
          >
            후기 좋은 순
          </div>
          <div
            className={`hotel-list-sortBar-button ${
              activeSort === "favorites" ? "active" : ""
            }`}
            role="button"
            onClick={() => handleSort("favorites")}
          >
            찜 많은 순
          </div>
        </div>
      </div>

      {/* 호텔 리스트 */}
      <div className="hotel-list-wrapper">
        <div className="hotel-list">
          {hotels.map((hotel) => (
            <div key={hotel.hotelNo} className="hotel-box">
              <Link to={`/hotels/${hotel.hotelNo}`} className="hotel-link">
                <div className="hotel-box-background">
                  {/* 호텔 이미지 */}
                  <img
                    className="hotel-image"
                    src={hotel.image}
                    alt={`호텔 ${hotel.name}`}
                  />

                  {/* 호텔 정보 */}
                  <div className="hotel-info">
                    <h2>{hotel.name}</h2>
                    <p>{hotel.location}</p>
                  </div>

                  {/* 호텔 가격 및 예약 버튼 */}
                  <div className="hotel-status-wrapper">
                    <div className="hotel-rating">
                      <p>★ {hotel.rating}</p>
                    </div>
                    <div className="hotel-price">
                      <p>1박당 요금</p>
                      <p>{hotel.price}</p>
                    </div>
                    <div className="reservation-button-container">
                      <button className="reservation-button">상세보기</button>
                    </div>
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
