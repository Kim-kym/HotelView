// src/components/ReservationConfirmation.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../../styled/HotelReserve.css";
import { dummyHotels, roomImages } from "./DummyList";

function HotelReserve() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedRoom } = location.state || {};
  const [hotel, setHotel] = useState(null);
  const [reservationInfo, setReservationInfo] = useState({
    name: "",
    phone: "",
  });

  // 예시 체크인/체크아웃 날짜 (추후 동적 데이터로 대체 가능)
  const checkIn = "2월 22일 (금)";
  const checkOut = "2월 23일 (토)";

  useEffect(() => {
    // 숙소 아이디를 기반으로 호텔 정보를 찾음
    const foundHotel = dummyHotels.find((h) => h.id === parseInt(id, 10));
    if (!foundHotel) {
      // 숙소 정보가 없으면 메인 페이지로 이동
      navigate("/");
    } else {
      setHotel(foundHotel);
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 예약 제출 로직 (예: API 호출)
    console.log("예약 정보:", reservationInfo);
    // 예약이 성공하면 ReservationConfirm 페이지로 데이터 전달하며 이동
    navigate("/reservationConfirm", {
      state: { hotel, selectedRoom, reservationInfo, checkIn, checkOut },
    });
  };

  if (!hotel) return <div>로딩 중...</div>;

  return (
    <div className="hotelReserve-container">
      {/* 전체 폼을 하나의 form 태그로 감싸서 onSubmit 이벤트와 함께 처리 */}
      <form className="hotelReserve-wrapper" onSubmit={handleSubmit}>
        <div className="hotelReserve-info-wrapper">
          <div className="hotelReserve-checkDate">
            <div className="hotelReserve-checkIn-wrapper">
              <h2>{checkIn}</h2>
              <span>
                체크인 <span className="bold-time">16:30</span>
              </span>
            </div>
            <div className="hotelReserve-arrow">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <div className="hotelReserve-checkOut-wrapper">
              <h2>{checkOut}</h2>
              <span>
                체크아웃 <span className="bold-time">11:00</span>
              </span>
            </div>
            <div>1박</div>
          </div>
          <div className="hotelReserve-info-main">
            <h2>숙소</h2>
            <img src={hotel.image} alt={`호텔 ${hotel.name}`} />
            <div className="hotelReserve-name">
              <h3>{hotel.name}</h3>
              <p>{hotel.address}</p>
            </div>
            <div className="hotelReserve-room">
              <img src={selectedRoom.image} alt={`Room ${selectedRoom.name}`} />
              <h3>{selectedRoom.name}</h3>
            </div>
          </div>
          <div className="hotelReserve-info">
            <p className="price">
              <span className="bold-price">{hotel.price}원</span>
              <div className="cancel-rule">무료 취소(3일 이내)</div>
            </p>
          </div>
        </div>

        <div className="under-info-form">
          <div>
            <h2>예약자 정보</h2>
          </div>
          <div className="under-info-form-wrapper">
            <div>
              <label htmlFor="name">성명</label>
            </div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="이름을 입력해주세요"
              value={reservationInfo.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="under-info-form-wrapper">
            <div>
              <label htmlFor="phone">휴대폰 번호</label>
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="휴대폰 번호를 입력해주세요"
              value={reservationInfo.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="payment-wrapper">
          <div className="payment-main">
            <h2 className="payment-name">결제 금액</h2>
            <div className="payment-charge">
              <a href="/mypage">포인트 충전하기</a>
            </div>
          </div>
          <div className="payment-price">
            <div>상품 금액</div>
            <div>{hotel.price}원</div>
          </div>
          <div className="payment-point">
            <div>보유 포인트</div>
            <div>150,000원</div>
          </div>
          <div className="cutLine"></div>
          <div className="payment-total-price">
            <div>총 결제 금액</div>
            <div>0원</div>
          </div>
        </div>
        <div className="payCheck-button">
          <button type="submit">결제하기</button>
        </div>
      </form>
    </div>
  );
}

export default HotelReserve;