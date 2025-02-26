import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styled/HomeHotelList.css";
import { dummyHotels } from "./DummyList"; // ✅ 더미 데이터 import

function HotelListDummy() {
  const [hotels, setHotels] = useState([]);

  // 화살표 버튼 준일추가 // 
  const [isVisible, setIsVisible] = useState(false); // 🔥 화살표 버튼 상태 추가

  console.log("더미 호텔 데이터:", dummyHotels); // ✅ 콘솔에서 확인
  console.log("현재 상태 값:", hotels); // ✅ 상태값 확인

  useEffect(() => {
    setHotels(dummyHotels);

    
    // 🔥 스크롤 감지 이벤트 추가 (준일추가)
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 🔥 버튼 클릭 시 상단 이동 (준일추가)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home_hotel-list-container">
      <h2>호텔</h2>
      <div className="home_hotel-list">
        {hotels.map((hotel) => (
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
                <p>₩ {hotel.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 🔥 스크롤 상단 이동 버튼 추가 */} {/* 준일추가 */}
      <button
        className={`scroll-to-top-button ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
      >
        ↑
      </button>
    </div>
  );
}

export default HotelListDummy;
