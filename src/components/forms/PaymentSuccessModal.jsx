import React from "react";
import "../../styled/PaymentSuccessModal.css"; // 결제 성공 모달 스타일

const PaymentSuccessModal = ({
  totalAmount,
  earnedPoints,
  usedDate,
  onClose,
}) => {
  return (
    <div className="payment-success-modal-overlay">
      <div className="payment-success-modal">
        <h3>결제를 성공하였습니다.</h3>

        <p>총 결제 금액: <strong>{totalAmount.toLocaleString()}원</strong></p>
        <p>적립된 포인트: <strong>{earnedPoints.toLocaleString()}P</strong></p>
        <p>결제일시: <strong>{usedDate}</strong></p>

        <button className="close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
