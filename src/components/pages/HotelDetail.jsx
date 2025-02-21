// src/components/HotelDetail.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../../styled/HotelDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

// 10개의 더미 데이터
// ★ 실제 API 사용 시 삭제
const dummyHotels = [
  {
    id: 1,
    name: "호텔 프리미어",
    address: "서울특별시 강남구 테헤란로 123",
    rating: 4.5,
    price: "150,000",
    image: "/images/hotel_dummy.jpg",
  },
  {
    id: 2,
    name: "호텔 클래식",
    address: "부산광역시 해운대구 달맞이길 45",
    rating: 4.0,
    price: "120,000",
    image: "https://via.placeholder.com/300x200?text=Hotel+2",
  },
  {
    id: 3,
    name: "호텔 오션뷰",
    address: "제주특별자치도 제주시 해안로 67",
    rating: 4.7,
    price: "200,000",
    image: "https://via.placeholder.com/300x200?text=Hotel+3",
  },
  {
    id: 4,
    name: "호텔 블루",
    address: "인천광역시 연수구 송도동",
    rating: 4.3,
    price: "140,000",
    image: "https://via.placeholder.com/300x200?text=Hotel+4",
  },
  {
    id: 5,
    name: "호텔 로얄",
    address: "대구광역시 중구 동성로",
    rating: 4.6,
    price: "160,000",
    image: "https://via.placeholder.com/300x200?text=Hotel+5",
  },
  {
    id: 6,
    name: "호텔 스카이",
    address: "대전광역시 서구 둔산동",
    rating: 4.2,
    price: "130,000",
    image: "https://via.placeholder.com/300x200?text=Hotel+6",
  },
  {
    id: 7,
    name: "호텔 센트럴",
    address: "광주광역시 북구 운암동",
    rating: 4.1,
    price: "125,000",
    image: "https://via.placeholder.com/300x200?text=Hotel+7",
  },
  {
    id: 8,
    name: "호텔 그랜드",
    address: "울산광역시 남구 삼산동",
    rating: 4.8,
    price: "210,000",
    image: "https://via.placeholder.com/300x200?text=Hotel+8",
  },
  {
    id: 9,
    name: "호텔 다이아몬드",
    address: "경기도 수원시 팔달구",
    rating: 4.4,
    price: "145,000",
    image: "https://via.placeholder.com/300x200?text=Hotel+9",
  },
  {
    id: 10,
    name: "호텔 벨라",
    address: "강원도 춘천시 중앙로",
    rating: 4.5,
    price: "155,000",
    image: "https://via.placeholder.com/300x200?text=Hotel+10",
  },
];
const roomImages = [
  { id: 1, src: "/images/room1.jpg", alt: "방 사진1" },
  { id: 2, src: "/images/room2.jpg", alt: "방 사진2" },
  { id: 3, src: "/images/room3.jpg", alt: "방 사진3" },
  { id: 4, src: "/images/room4.jpg", alt: "방 사진4" },
  { id: 5, src: "/images/room5.jpg", alt: "방 사진5" },
  { id: 6, src: "/images/room6.jpg", alt: "방 사진6" },
];
const reviews = [
  { id: 1, rating: "★★★★★", date: "2023-01-01", content: "리뷰 내용 1" },
  { id: 2, rating: "★★★★★", date: "2023-02-01", content: "리뷰 내용 2" },
  { id: 3, rating: "★★★★★", date: "2023-03-01", content: "리뷰 내용 3" },
];

// ★ 추가 더미 데이터
// 1. room-box 내부에서 사용할 방 정보 (image와 room-name)
const roomsData = [
  { id: 1, image: "/images/room1.jpg", name: "싱글룸" },
  { id: 2, image: "/images/room2.jpg", name: "더블룸" },
  { id: 3, image: "/images/room3.jpg", name: "스위트룸" },
];

// 2. room-reserve-wrapper 내부에서 사용할 "가격"과 "남은 객실 수" 정보
const reserveDetails = [
  { id: 1, label: "가격", value: "150,000" },
  { id: 2, label: "남은 객실", value: "1" },
];

//

function HotelDetail() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

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
                          <button>예약하기</button>
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
