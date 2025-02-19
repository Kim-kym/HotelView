// src/components/HotelListDummy.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styled/HotelList.css";

function HotelListDummy() {
  // 10개의 더미 데이터
  const dummyHotels = [
    {
      id: 1,
      name: "호텔 프리미어",
      address: "서울특별시 강남구 테헤란로 123",
      rating: 4.5,
      price: "150,000원/박",
      image: "/images/hotel_dummy.jpg",
    },
    {
      id: 2,
      name: "호텔 클래식",
      address: "부산광역시 해운대구 달맞이길 45",
      rating: 4.0,
      price: "120,000원/박",
      image: "https://via.placeholder.com/300x200?text=Hotel+2",
    },
    {
      id: 3,
      name: "호텔 오션뷰",
      address: "제주특별자치도 제주시 해안로 67",
      rating: 4.7,
      price: "200,000원/박",
      image: "https://via.placeholder.com/300x200?text=Hotel+3",
    },
    {
      id: 4,
      name: "호텔 블루",
      address: "인천광역시 연수구 송도동",
      rating: 4.3,
      price: "140,000원/박",
      image: "https://via.placeholder.com/300x200?text=Hotel+4",
    },
    {
      id: 5,
      name: "호텔 로얄",
      address: "대구광역시 중구 동성로",
      rating: 4.6,
      price: "160,000원/박",
      image: "https://via.placeholder.com/300x200?text=Hotel+5",
    },
    {
      id: 6,
      name: "호텔 스카이",
      address: "대전광역시 서구 둔산동",
      rating: 4.2,
      price: "130,000원/박",
      image: "https://via.placeholder.com/300x200?text=Hotel+6",
    },
    {
      id: 7,
      name: "호텔 센트럴",
      address: "광주광역시 북구 운암동",
      rating: 4.1,
      price: "125,000원/박",
      image: "https://via.placeholder.com/300x200?text=Hotel+7",
    },
    {
      id: 8,
      name: "호텔 그랜드",
      address: "울산광역시 남구 삼산동",
      rating: 4.8,
      price: "210,000원/박",
      image: "https://via.placeholder.com/300x200?text=Hotel+8",
    },
    {
      id: 9,
      name: "호텔 다이아몬드",
      address: "경기도 수원시 팔달구",
      rating: 4.4,
      price: "145,000원/박",
      image: "https://via.placeholder.com/300x200?text=Hotel+9",
    },
    {
      id: 10,
      name: "호텔 벨라",
      address: "강원도 춘천시 중앙로",
      rating: 4.5,
      price: "155,000원/박",
      image: "https://via.placeholder.com/300x200?text=Hotel+10",
    },
  ];

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // 컴포넌트가 마운트되면 더미 데이터를 설정
  useEffect(() => {
    // API 호출 대신 더미 데이터 적용
    setHotels(dummyHotels);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="hotel-list-container">
      <div className="hotel-list-background">
        <img src="/images/sea.jpg" alt="sea" />
      </div>
      <div className="hotel-list-wrapper">
        <div className="hotel-list">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-box">
              <Link to={`/hotel/${hotel.id}`}>
                <div className="hotel-box-background">
                  <img
                    className="hotel-image"
                    src={hotel.image}
                    alt={`호텔 ${hotel.name}`}
                  />
                  <div className="hotel-info">
                    <h2>{hotel.name}</h2>
                    <p>주소: {hotel.address}</p>
                    <p>가격: {hotel.price}</p>
                  </div>
                  <div className="hotel-booking">
                    <h3>평점: {hotel.rating} / 5</h3>
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
