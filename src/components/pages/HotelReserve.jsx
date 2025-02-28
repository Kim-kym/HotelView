import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../../styled/HotelReserve.css";

function HotelReserve() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { hotel, hotelImages, roomImages, selectedRoom } = location.state || {};
  const [reservationInfo, setReservationInfo] = useState({
    name: "",
    phone: "",
  });

  // 예시 체크인/체크아웃 날짜 (추후 동적 데이터로 대체 가능)
  const checkIn = "2월 22일 (금)";
  const checkOut = "2월 23일 (토)";

  if (!hotel) return <div>로딩 중...</div>;

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
    navigate("/reservationConfirm", {
      state: { hotel, selectedRoom, reservationInfo, checkIn, checkOut },
    });
  };

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
            <img
              src={
                hotelImages && hotelImages.length > 0
                  ? hotelImages[0]
                  : "/images/default-hotel.jpg"
              }
              alt={`호텔 ${hotel.name}`}
            />
            <div className="hotelReserve-name">
              <h3>{hotel.name}</h3>
              <p>{hotel.address}</p>
            </div>
            <div className="hotelReserve-room">
              <img
                src={
                  roomImages && roomImages[selectedRoom.id]
                    ? roomImages[selectedRoom.id]
                    : "/images/default-room.jpg"
                }
                alt={`Room ${selectedRoom.name}`}
              />
              <h3>{selectedRoom.name}</h3>
            </div>
          </div>
          <div className="hotelReserve-info">
            <div className="price">
              <span className="bold-price">
                {selectedRoom.price
                  ? selectedRoom.price.toLocaleString() + "원"
                  : "가격 정보 없음"}
              </span>
              <div className="cancel-rule">무료 취소(3일 이내)</div>
            </div>
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
            <div>
              {selectedRoom.price
                ? selectedRoom.price.toLocaleString() + "원"
                : "가격 정보 없음"}
            </div>
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
