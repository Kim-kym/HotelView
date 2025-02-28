import React, { useState } from "react";
import "../../styled/KakaoQRModal.css";
import PaymentSuccessModal from "./PaymentSuccessModal";

const KakaoQRModal = ({ defaultTab = "kakao", totalAmount, onClose }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  // 결제 성공 모달 표시 여부
  const [showSuccess, setShowSuccess] = useState(false);

  // ★ basePoints, bonusPoints, usedDate
  const [basePoints, setBasePoints] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [usedDate, setUsedDate] = useState("");

  // 결제하기 버튼
  const handleConfirm = () => {
    // 포인트 계산
    const base = totalAmount;
    const bonus = base + Math.floor(base * 0.1);
    setBasePoints(base);
    setBonusPoints(bonus);
    setUsedDate(new Date().toLocaleString());

    // 결제 성공 모달
    setShowSuccess(true);
  };

  // 취소 버튼
  const handleCancel = () => {
    onClose();
  };

  // 카카오페이 탭 내용
  const renderKakaoPayContent = () => (
    <div className="kakao-pay-content">
      <div className="kakao-row">
        <span className="kakao-label">상품</span>
        <span className="kakao-value">포인트 충전</span>
      </div>
      <div className="kakao-row">
        <span className="kakao-label">금액</span>
        <span className="kakao-value">{totalAmount.toLocaleString()}원</span>
      </div>
      <div className="kakao-row">
        <span className="kakao-label">카카오페이포인트</span>
        <button className="kakao-point-btn">모두사용</button>
      </div>
      <div className="kakao-row kakao-total-row">
        <span className="kakao-label">결제금액</span>
        <strong className="kakao-total-price">
          {totalAmount.toLocaleString()}원
        </strong>
      </div>
      <p className="kakao-terms">결제조건 확인 및 개인정보 제공에 동의합니다.</p>
      <button className="kakao-testpay-btn" onClick={handleConfirm}>
        결제하기
      </button>
    </div>
  );

  // QR코드 탭 내용
  const renderQRContent = () => (
    <div className="qr-pay-content">
      <h4>QR코드 결제</h4>
      <p>아래 QR코드를 스캔하여 결제해주세요.</p>
      <div className="qr-code-box">
        <img src="/images/qr_code.jpg" alt="QR코드" />
      </div>
      <button className="kakao-testpay-btn" onClick={handleConfirm}>
        결제하기
      </button>
    </div>
  );

  // 탭별 내용
  const renderTabContent = () => {
    if (selectedTab === "kakao") {
      return renderKakaoPayContent();
    } else {
      return renderQRContent();
    }
  };

  // 결제 성공 모달 열렸을 때
  if (showSuccess) {
    return (
      <PaymentSuccessModal
        basePoints={basePoints}
        bonusPoints={bonusPoints}
        usedDate={usedDate}
        onClose={() => {
          setShowSuccess(false);
          onClose(); // 모달 닫기
        }}
      />
    );
  }

  return (
    <div className="kakaoqr-modal-overlay">
      <div className="kakaoqr-modal">
        <h3> KaKaO pay / QR코드 결제</h3>
        <p className="kakaoqr-total-amount">
          총 결제 금액: <strong>{totalAmount.toLocaleString()}원</strong>
        </p>

        {/* 탭 버튼 */}
        <div className="kakaoqr-tabs">
          <button
            className={selectedTab === "kakao" ? "active" : ""}
            onClick={() => setSelectedTab("kakao")}
          >
            KaKaO pay
          </button>
          <button
            className={selectedTab === "qr" ? "active" : ""}
            onClick={() => setSelectedTab("qr")}
          >
            QR코드
          </button>
        </div>

        {/* 탭별 내용 */}
        <div className="kakaoqr-tab-content">{renderTabContent()}</div>

        {/* 하단 버튼 영역 */}
        <div className="kakaoqr-actions">
          <button className="cancel-button" onClick={handleCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default KakaoQRModal;
