import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styled/HomeHotelList.css";
import api from "../api/api"; // ✅ 공통 API 파일 import

function HomeHotelList() {
  // const { hotelId } = useParams();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const response = await api.get("/hotel/hotels");

        const hotelData = response.data;

        // 이미지 데이터 로드
        const hotelsWithImages = await Promise.all(
          hotelData.map(async (hotel) => {
            try {
              const imgResponse = await api.get(
                `/hotel/hotels/${hotel.hotelNo}/images`
              );
              return {
                ...hotel,
                image: imgResponse.data[0],
              };
            } catch (error) {
              console.error(error);
            }
          })
        );

        setHotels(hotelsWithImages);
      } catch (error) {
        console.error(error);
      }
    }

    fetchHotels();
  }, []);

  return (
    <div className="home_hotel-list-container">
      <h2>호텔</h2>
      <div className="home_hotel-list">
        {hotels && hotels.length > 0 ? (
          hotels.map((hotel) => (
            <Link
              to={`/hotels/${hotel.hotelNo}`}
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
                  <p>{hotel.location}</p>
                  <p>⭐ {hotel.rating}</p>
                  {/* price 필드 추가 전<p>₩ {hotel.price.toLocaleString()}</p> */}
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

export default HomeHotelList;
