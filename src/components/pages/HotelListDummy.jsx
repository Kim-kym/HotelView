import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../../styled/HotelList.css";
import { dummyHotels } from "./DummyList"; // :흰색_확인_표시: 올바른 경로 확인!
function HotelListDummy() {
  const [hotels, setHotels] = useState(dummyHotels);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSort = searchParams.get("sort") || "recommend";
  const [activeSort, setActiveSort] = useState(initialSort);

  // 정렬 함수
  const handleSort = (sortType) => {
    let sortedHotels = [...dummyHotels];

    switch (sortType) {
      case "recommend":
        sortedHotels = [...dummyHotels];
        break;
      case "price":
        sortedHotels.sort(
          (a, b) =>
            parseInt(a.price.replace(/,/g, "")) -
            parseInt(b.price.replace(/,/g, ""))
        );
        break;
      case "rating":
        sortedHotels.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setHotels(sortedHotels);
    setActiveSort(sortType);
    setSearchParams({ sort: sortType });
  };

  return (
    <div className="hotel-list-container">
      <div className="hotel-list-background">
        <img src="/images/sea.jpg" alt="sea" />
      </div>
      <div className="hotel-list-wrapper">
        <div className="hotel-list">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-box">
              <Link to={`/hotels/${hotel.id}`} className="hotel-link">
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
                    <p>{hotel.address}</p>
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
