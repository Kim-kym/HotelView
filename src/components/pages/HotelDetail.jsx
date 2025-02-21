// src/components/HotelDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../../styled/HotelDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {
  dummyHotels,
  roomImages,
  reviews,
  roomsData,
  reserveDetails,
} from "./DummyList";

function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    //  ★  실제 API 사용 시 필요
    /*
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
    */

    //  ★ 실제 API 사용 시 삭제
    const foundHotel = dummyHotels.find((h) => h.id === parseInt(id, 10));
    setHotel(foundHotel);
    setLoading(false);
    //
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!hotel) {
    return <div>해당 호텔 정보를 찾을 수 없습니다.</div>;
  }

  const handleReserve = (room) => {
    navigate(`/reservation/${hotel.id}`, { state: { selectedRoom: room } });
  };

  return (
    <div className="hotel-detail-container">
      <div className="hotel-detail-image-wrapper">
        <div className="hotel-detail-main-image">
          <img
            src={hotel.image}
            alt={`호텔 ${hotel.name}`}
            className="detail-image"
          />
        </div>
        <div className="hotel-detail-sub-images">
          {roomImages.map((image) => (
            <img key={image.id} src={image.src} alt={image.alt} />
          ))}
        </div>
      </div>
      <div className="hotel-detail-info-box">
        <div className="hotel-detail-info">
          <h2>{hotel.name}</h2>
          <p>{hotel.address}</p>
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
              {roomsData.map((room) => (
                <div className="room-wrapper" key={room.id}>
                  <div className="room-image">
                    <img src={room.image} alt={`Room ${room.name}`} />
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
                        {/* "가격" 정보만 필터링 후 map 함수로 렌더링 */}
                        {reserveDetails
                          .filter((detail) => detail.label === "가격")
                          .map((detail) => (
                            <div key={detail.id}>
                              <span className="bold-price">
                                {detail.value}원
                              </span>
                            </div>
                          ))}
                        <div className="cancle-rule">무료 취소(3일 이내)</div>
                      </div>
                      <div className="room-status-box">
                        {/* "남은 객실 수" 정보만 필터링 후 map 함수로 렌더링 */}
                        {reserveDetails
                          .filter((detail) => detail.label === "남은 객실")
                          .map((detail) => (
                            <div key={detail.id}>
                              <span className="available-room">
                                {" "}
                                {detail.label} {detail.value}개
                              </span>
                            </div>
                          ))}
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
