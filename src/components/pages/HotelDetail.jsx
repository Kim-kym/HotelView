// src/components/HotelDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../../styled/HotelDetail.css";
import api from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function HotelDetail() {
  const { id } = useParams(); // URL에서 호텔 ID 가져오기
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]); // ✅ 객실 정보 저장
  const [reviews, setReviews] = useState([]); // ✅ 리뷰 데이터 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHotelDetails() {
      try {
        // ✅ 호텔 기본 정보 가져오기
        const hotelResponse = await api.get(`/hotel/hotels/${id}`);
        setHotel(hotelResponse.data);

        // ✅ 객실 목록 가져오기
        // const roomsResponse = await api.get(`/hotels/${id}/rooms`);
        // setRooms(roomsResponse.data);

        // ✅ 호텔 리뷰 가져오기
        // const reviewsResponse = await api.get(`/hotels/${id}/reviews`);
        // setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchHotelDetails();
  }, [id]);

  if (loading) return <p>호텔 정보를 불러오는 중...</p>;
  if (error) return <p>{error}</p>;

  const handleReserve = (room) => {
    navigate(`/reservation/${hotel.id}`, { state: { selectedRoom: room } });
  };

  return (
    <div className="hotel-detail-container">
      <div className="hotel-detail-image-wrapper">
        <div className="hotel-detail-main-image">
          <img
            src={
              hotel.image_url ? hotel.image_url : "/images/default-hotel.jpg"
            }
            alt={`호텔 ${hotel.name}`}
            className="detail-image"
          />
        </div>
        <div className="hotel-detail-sub-images">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <img
                key={room.id}
                src={
                  room.image_url ? room.image_url : "/images/default-room.jpg"
                }
                alt={`객실 ${room.name}`}
                className="room-sub-image"
              />
            ))
          ) : (
            <p>객실 이미지가 없습니다.</p>
          )}
        </div>
      </div>
      <div className="hotel-detail-info-box">
        <div className="hotel-detail-info">
          <h2>{hotel.name}</h2>
          <p>{hotel.location}</p>
          <div className="review-box">
            <div>
              <h2>
                <strong>★ {hotel.rating}</strong>
              </h2>
            </div>
            <section className="review-list-box">
              <ul className="review-list-wrapper">
                {reviews.map((review) => (
                  <li key={review.id}>
                    <div className="review-list">
                      <a href="/">
                        <div className="rating-date-wrapper">
                          <div className="review-list-rating">
                            {review.rating}
                          </div>
                          <div className="review-list-date">{review.date}</div>
                        </div>
                        <div className="review-list-content">
                          {review.content}
                        </div>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="room-container">
            <div>
              <h3>객실 선택</h3>
            </div>
            <div className="room-box">
              {/* roomsData 배열을 map 함수로 렌더링 */}
              {rooms.map((room) => (
                <div className="room-wrapper" key={room.id}>
                  <div className="room-image">
                    <img
                      src={
                        room.image_url
                          ? room.image_url
                          : "/images/default-room.jpg"
                      }
                      alt={`Room ${room.name}`}
                    />
                    <div>
                      <h3>
                        <div className="room-name">{room.name}</div>
                      </h3>
                    </div>
                  </div>
                  <div className="room-reserve-box">
                    <div className="room-reserve-wrapper">
                      <div>
                        <div className="accommodation">숙박</div>
                        <div className="checkinAndCheckoutTime">
                          체크인 <span className="bold-number">16:30</span> ~
                          체크아웃 <span className="bold-number">11:00</span>
                        </div>
                      </div>
                      <div className="room-price-box">
                        <div>
                          <span className="bold-price">
                            {room.price.toLocaleString()}원
                          </span>
                        </div>
                        <div className="cancle-rule">무료 취소(3일 이내)</div>
                      </div>
                      <div className="room-status-box">
                        <div>
                          <span className="available-room">
                            남은 객실:
                            {room.availableRooms
                              ? `${room.availableRooms}개`
                              : "정보 없음"}
                          </span>
                        </div>
                        <div className="favoriteAndReserve-button">
                          <button>
                            <FontAwesomeIcon icon={faCartShopping} />
                          </button>
                          <button onClick={() => handleReserve(room)}>
                            예약하기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Link to="/">뒤로가기</Link>
    </div>
  );
}

export default HotelDetail;
