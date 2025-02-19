// src/components/HotelDetail.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./HotelDetail.css";

function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotel() {
      try {
        const response = await fetch(`https://example.com/api/hotels/${id}`);
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error("호텔 상세 정보를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHotel();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!hotel) {
    return <div>해당 호텔 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="hotel-detail-container">
      <header>
        <h1>{hotel.name}</h1>
      </header>
      <div className="container">
        <img
          src={hotel.image}
          alt={`호텔 ${hotel.name}`}
          className="detail-image"
        />
        <div className="hotel-info">
          <p>
            <strong>주소:</strong> {hotel.address}
          </p>
          <p>
            <strong>평점:</strong> {hotel.rating} / 5
          </p>
          <p>
            <strong>가격:</strong> {hotel.price}
          </p>
          <p>{hotel.description}</p>
        </div>
        <Link to="/">목록으로 돌아가기</Link>
      </div>
    </div>
  );
}

export default HotelDetail;
