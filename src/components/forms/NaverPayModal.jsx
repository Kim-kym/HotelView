import React, { useState } from "react";
import "../../styled/NaverPayModal.css";
import PaymentSuccessModal from "./PaymentSuccessModal";

const NaverPayModal = ({ defaultTab = "naverpay", totalAmount, onClose }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  // 결제 성공 모달 표시 여부
  const [showSuccess, setShowSuccess] = useState(false);

  // 적립 포인트, 결제 일시
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [usedDate, setUsedDate] = useState("");

  // 결제하기 버튼
  const handleConfirm = () => {
    // 예: 포인트 적립 로직 (10% 가정)
    const points = Math.floor(totalAmount * 0.1);
    setEarnedPoints(points);

    // 결제 일시 기록
    setUsedDate(new Date().toLocaleString());

    // PaymentSuccess 모달 띄우기
    setShowSuccess(true);
  };

  // 취소 버튼
  const handleCancel = () => {
    onClose();
  };

  // N-Pay 결제 탭 내용
  const renderNaverPayContent = () => {
    return (
      <div className="naverpay-content">
        <h4>N-Pay 결제</h4>
        <div className="naverpay-benefit">
          <p>포인트 혜택: 구매 시 1% 적립</p>
        </div>
        <div className="naverpay-payment">
          <h4>결제금액</h4>
          <div className="naverpay-payment-amount">
            {totalAmount.toLocaleString()}원
          </div>
        </div>
      </div>
    );
  };

  // QR코드 결제 탭 내용
  const renderQRContent = () => {
    return (
      <div className="naverpay-qr-content">
        <h4>QR코드 결제</h4>
        <p>아래 QR코드를 스캔하여 결제해주세요.</p>
        <div className="qr-code-box">
          <img src="/images/qr_code.jpg" alt="QR코드" />
        </div>
      </div>
    );
  };

  // 탭별로 내용 전환
  const renderTabContent = () => {
    if (selectedTab === "naverpay") {
      return renderNaverPayContent();
    } else {
      return renderQRContent();
    }
  };

  // 만약 결제 성공 모달을 띄워야 한다면, PaymentSuccess를 먼저 렌더링
  if (showSuccess) {
    return (
      <PaymentSuccessModal
        totalAmount={totalAmount}
        earnedPoints={earnedPoints}
        usedDate={usedDate}
        onClose={() => {
          setShowSuccess(false);
          onClose(); // 최종 닫기
        }}
      />
    );
  }

  return (
    <div className="naverpay-modal-overlay">
      <div className="naverpay-modal">
        <h3>N pay 결제</h3>
        <p className="naverpay-total-amount">
          총 결제 금액: <strong>{totalAmount.toLocaleString()}원</strong>
        </p>

        {/* 탭 버튼 */}
        <div className="naverpay-tabs">
          <button
            className={selectedTab === "naverpay" ? "active" : ""}
            onClick={() => setSelectedTab("naverpay")}
          >
            N-Pay
          </button>
          <button
            className={selectedTab === "qr" ? "active" : ""}
            onClick={() => setSelectedTab("qr")}
          >
            QR코드
          </button>
        </div>

        {/* 탭별 컨텐츠 */}
        <div className="naverpay-tab-content">{renderTabContent()}</div>

        {/* 하단 버튼 영역 */}
        <div className="naverpay-button-group">
          <button className="naverpay-cancel-button" onClick={handleCancel}>
            취소
          </button>
          <button className="naverpay-confirm-button" onClick={handleConfirm}>
            {totalAmount.toLocaleString()}원 결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NaverPayModal;
