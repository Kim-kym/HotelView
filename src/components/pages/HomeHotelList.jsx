import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styled/HomeHotelList.css";
import api from "../api/api"; // ✅ 공통 API 파일 import

function HotelListDummy() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // ✅ API 호출하여 호텔 데이터 가져오기
    api
      .get("/hotel/hotels")
      .then((response) => {
        setHotels(response.data); // ✅ 상태 업데이트
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
      });
  }, []);

  return (
    <div className="home_hotel-list-container">
      <h2>호텔</h2>
      <div className="home_hotel-list">
        {hotels && hotels.length > 0 ? (
          hotels.map((hotel) => (
            <Link
              to={`/hotels/${hotel.id}`}
              key={hotel.id}
              className="home_hotel-box-link"
            >
              <div className="home_hotel-box">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="home_hotel-image"
                />
                <div className="home_hotel-info">
                  <h3>{hotel.name}</h3>
                  <p>{hotel.address}</p>
                  <p>⭐ {hotel.rating}</p>
                  {/* <p>₩ {hotel.price.toLocaleString()}</p> */}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>호텔 데이터를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
}

export default HotelListDummy;
