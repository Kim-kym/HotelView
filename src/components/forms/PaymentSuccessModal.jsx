import React from "react";
import "../../styled/PaymentSuccessModal.css";

const PaymentSuccessModal = ({
  basePoints, //  결제금액
  bonusPoints,  //  결제금액의 10% 적립
  usedDate, //  결제내용
  onClose,  //  결제종료
}) => {
  // 예: 가맹점 이름, 결제금액, 카드번호 등 원하는 데이터
  const storeName = "자쿠과";
  const totalPayment = bonusPoints; // 총 결제금액(또는 총 적립포인트)
  // 필요 시 props로 받은 값 등을 사용해도 됩니다

  return (
    <div className="payment-success-modal-overlay">
      <div className="payment-success-modal">
        {/* 상단 파란 헤더 */}
        <div className="payment-success-header">
          {/* 체크 아이콘 */}
          <div className="icon-circle">
            <img src="/images/logo.png" alt="logo icon" />
          </div>
          <h2>결제요청 처리완료</h2>
        </div>

        {/* 본문 (영수증 영역) */}
        <div className="payment-success-body">
          <ul className="receipt-list">
            <li>
              <span className="label">가맹점</span>
              <span className="value">{storeName}</span>
            </li>
            <li>
              <span className="label">결제금액</span>
              <span className="value">
                {basePoints.toLocaleString()}원
              </span>
            </li>
          </ul>

          <div className="dotted-line"></div>

          <ul className="receipt-list">
            <li>
              <span className="label">총 적립포인트(결제금액의 10% 추가적립)</span>
              <span className="value">
                {bonusPoints.toLocaleString()}원
              </span>
            </li>
            <li>
              <span className="label">결제일시</span>
              <span className="value">{usedDate}</span>
            </li>
          </ul>
        </div>

        {/* 하단 버튼 */}
        <div className="payment-success-footer">
          <button className="confirm-button" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
