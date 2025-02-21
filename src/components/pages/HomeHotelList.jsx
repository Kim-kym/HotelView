import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styled/HomeHotelList.css";
import dummyHotels from "./DummyList"; // ✅ 더미 데이터 import

function HotelListDummy() {
  const [hotels, setHotels] = useState([]);

  console.log("더미 호텔 데이터:", dummyHotels); // ✅ 콘솔에서 확인
  console.log("현재 상태 값:", hotels); // ✅ 상태값 확인

  // useEffect(() => {
  //   if (!dummyHotels || dummyHotels.length === 0) {
  //     console.error("더미 호텔 데이터가 비어 있음!");
  //   } else {
  //     setHotels(dummyHotels);
  //   }
  // }, []);

  useEffect(() => {
    setHotels(dummyHotels);
  }, []);

  return (
    <div className="hotel-list-container">
      <h2>호텔</h2>
      <div className="hotel-list">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-box">
            <img src={hotel.image} alt={hotel.name} className="hotel-image" />
            <Link to={`/hotels/${hotel.id}`}>
              <h3>{hotel.name}</h3>
              <p>{hotel.address}</p>
              <p>⭐ {hotel.rating}</p>
              <p>₩ {hotel.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelListDummy;
