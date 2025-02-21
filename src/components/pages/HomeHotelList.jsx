import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styled/HomeHotelList.css";
import dummyHotels from "./DummyList"; // ✅ 더미 데이터 import

function HotelListDummy() {
  const [hotels, setHotels] = useState([]);

  console.log("더미 호텔 데이터:", dummyHotels); // ✅ 콘솔에서 확인
  console.log("현재 상태 값:", hotels); // ✅ 상태값 확인

  useEffect(() => {
    setHotels(dummyHotels);
  }, []);

  return (
    <div className="hotel-list-container">
      <h2>호텔</h2>
      <div className="hotel-list">
        {hotels.map((hotel) => (
          <Link to={`/hotels/${hotel.id}`} key={hotel.id} className="hotel-box-link">
            <div className="hotel-box">
              <img src={hotel.image} alt={hotel.name} className="hotel-image" />
              <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <p>{hotel.address}</p>
                <p>⭐ {hotel.rating}</p>
                <p>₩ {hotel.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HotelListDummy;
