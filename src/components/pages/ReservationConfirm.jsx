// src/components/ReservationConfirm.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../../styled/ReservationConfirm.css";

function ReservationConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  // 이전 페이지에서 전달한 데이터 구조 분해
  const { hotel, selectedRoom, reservationInfo, checkIn, checkOut } = location.state || {};

  if (!hotel || !selectedRoom || !reservationInfo) {
    return (
      <div>
        정보가 부족합니다. 이전 페이지로 돌아갑니다.
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    );
  }

  // 결제 금액 계산 (예시)
  const productPrice = parseInt(hotel.price, 10);
  const availablePoints = 150000;
  const totalPayment = productPrice - availablePoints > 0 ? productPrice - availablePoints : 0;

  return (
    <div className="payment-details-container">
      <h1>예약이 완료 되었습니다.</h1>
      <section className="payment-details">
        {/* 체크인/체크아웃 날짜 */}
        <div className="dates">
          <div className="check-in">
            <h2>{checkIn}</h2>
            <span>체크인: 16:30</span>
          </div>
          <div className="arrow">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
          <div className="check-out">
            <h2>{checkOut}</h2>
            <span>체크아웃: 11:00</span>
          </div>
          <div className="stay-duration">1박</div>
        </div>

        {/* 숙소 정보 */}
        <div className="hotel-info">
          <h2>숙소 정보</h2>
          <img src={hotel.image} alt={`호텔 ${hotel.name}`} />
          <div className="hotel-details">
            <h3>{hotel.name}</h3>
            <p>{hotel.address}</p>
            <p>가격: {hotel.price}원</p>
          </div>
        </div>

        {/* 선택한 방 정보 */}
        <div className="room-info">
          <h2>선택한 방</h2>
          <img src={selectedRoom.image} alt={`Room ${selectedRoom.name}`} />
          <p>{selectedRoom.name}</p>
        </div>

        {/* 예약자 정보 */}
        <div className="reservation-info">
          <h2>예약자 정보</h2>
          <p>이름: {reservationInfo.name}</p>
          <p>휴대폰 번호: {reservationInfo.phone}</p>
        </div>

        {/* 결제 정보 */}
        <div className="payment-info">
          <h2>결제 금액</h2>
          <div className="payment-row">
            <div>상품 금액</div>
            <div>{hotel.price}원</div>
          </div>
          <div className="payment-row">
            <div>보유 포인트</div>
            <div>{availablePoints.toLocaleString()}원</div>
          </div>
          <hr />
          <div className="payment-row total">
            <div>총 결제 금액</div>
            <div>{totalPayment.toLocaleString()}원</div>
          </div>
        </div>
      </section>
      <div className="confirm-button">
        <button onClick={() => navigate("/")}>홈으로 이동</button>
      </div>
    </div>
  );
}

export default ReservationConfirm;