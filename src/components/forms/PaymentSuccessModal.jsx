import React from "react";
import "../../styled/PaymentSuccessModal.css";

const PaymentSuccessModal = ({
  basePoints,
  bonusPoints,
  usedDate,
  onClose,
}) => {
  return (
    <div className="payment-success-modal">
      <div className="payment-success-content">
        <h2>결제를 성공하였습니다.</h2>
        {/* basePoints = 결제금액, bonusPoints = 결제금액 + 10% */}
        <p>결제포인트: {basePoints.toLocaleString()}원</p>
        <p>총 적립포인트: {bonusPoints.toLocaleString()}원</p>
        <p>결제일시: {usedDate}</p>

        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
