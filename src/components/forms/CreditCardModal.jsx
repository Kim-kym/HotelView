import React, { useState, useEffect } from "react";
import "../../styled/CreditCardModal.css"; 
import PaymentSuccessModal from "./PaymentSuccessModal"; // 새로 만든 결제 성공 모달

const CreditCardModal = ({ totalAmount, onClose }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardPassword, setCardPassword] = useState("");
  const [cvc, setCvc] = useState("");
//   const [timeLeft, setTimeLeft] = useState(20);

  // 추가: 결제 성공 모달 표시 여부
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 포인트 적립 예시 (원하는 로직 적용 가능)
  const [earnedPoints, setEarnedPoints] = useState(0);
  // 결제 사용 날짜
  const [usedDate, setUsedDate] = useState("");

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       onClose();
//       return;
//     }
//     const timerId = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);
//     return () => clearInterval(timerId);
//   }, [timeLeft, onClose]);

  const handleConfirm = () => {
    if (!cardNumber || !cardPassword || !cvc) {
      alert("카드번호, 비밀번호, CVC를 모두 입력해주세요.");
      return;
    }
    // 결제 로직(스프링 부트 API 등) 호출 가능
    // 예: 포인트 적립 로직 (10% 가정)
    const points = Math.floor(totalAmount * 0.1);

    setEarnedPoints(points);
    setUsedDate(new Date().toLocaleString()); // 현재 시간 기록

    // 결제 성공 모달 표시
    setShowSuccessModal(true);
  };

  // 결제 성공 모달 닫기 콜백
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    // 최종 모달 닫기
    onClose();
  };

//   // 숫자 타이머 텍스트
//   const renderTimerText = () => {
//     return <p className="timer-text"> {timeLeft}초</p>;
//   };

  if (showSuccessModal) {
    // 결제 성공 모달 표시 시, 카드 입력창 대신 성공 모달 렌더링
    return (
      <PaymentSuccessModal
        totalAmount={totalAmount}
        earnedPoints={earnedPoints}
        usedDate={usedDate}
        onClose={handleSuccessClose}
      />
    );
  }

  return (
    <div className="credit-card-modal-overlay">
      <div className="credit-card-modal">
        <h3>신용카드 정보 입력</h3>
        <p>아래 정보를 입력해주세요.</p>

        <p className="total-amount-text">
          총 결제 금액: <strong>{totalAmount.toLocaleString()}원</strong>
        </p>

        <input
          type="text"
          placeholder="카드번호 (숫자만)"
          value={cardNumber}
          onChange={(e) =>
            setCardNumber(e.target.value.replace(/[^0-9]/g, ""))
          }
        />
        <input
          type="password"
          placeholder="카드비밀번호"
          value={cardPassword}
          onChange={(e) => setCardPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="CVC번호"
          value={cvc}
          onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ""))}
        />

        {/* {renderTimerText()} */}

        <div className="modal-button-group">
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
          <button className="confirm-button" onClick={handleConfirm}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditCardModal;
