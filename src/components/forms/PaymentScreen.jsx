import React, { useState } from "react";
import "../../styled/PaymentScreen.css";

const PaymentScreen = ({ totalAmount, onClose }) => {
  // 탭 전환 상태: "card", "phone", "qr"
  const [selectedTab, setSelectedTab] = useState("card");
  // 카드 결제 옵션 선택 (이미지 버튼)
  const [selectedCardOption, setSelectedCardOption] = useState("");
  // 핸드폰 결제 관련 상태
  const [selectedCarrier, setSelectedCarrier] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // QR코드 결제 URL (예시)
  const qrUrl = "https://example.com/qr-payment";

  // 탭 전환 함수
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // 결제 완료 버튼 처리
  const handleConfirmPayment = () => {
    if (selectedTab === "card") {
      if (!selectedCardOption) {
        alert("카드 결제 수단을 선택해주세요.");
        return;
      }
    } else if (selectedTab === "phone") {
      if (!selectedCarrier || !phoneNumber) {
        alert("핸드폰 결제 정보를 모두 입력해주세요.");
        return;
      }
    }
    // QR 탭은 별도 검증 없이 진행 가능
    alert(`결제 완료! 충전 금액: ${totalAmount.toLocaleString()}원`);
    onClose();
  };

  // 탭별 내용 렌더링
  const renderTabContent = () => {
    switch (selectedTab) {
      case "card":
        return (
          <div className="payment-tab-content">
            <h4>카드결제</h4>
            <p>아래에서 카드사 / 은행 / 페이 옵션을 선택해주세요.</p>
            <div className="card-options-grid">
              {cardOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`card-option ${selectedCardOption === option.value ? "selected" : ""}`}
                  onClick={() => setSelectedCardOption(option.value)}
                >
                  <img src={option.img} alt={option.value} />
                  <span>{option.value}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case "phone":
        return (
          <div className="payment-tab-content">
            <h4>핸드폰결제</h4>
            <p>통신사와 핸드폰 번호를 입력해주세요.</p>
            <div className="mobile-payment-inputs">
              <select
                value={selectedCarrier}
                onChange={(e) => setSelectedCarrier(e.target.value)}
              >
                <option value="">-- 통신사 선택 --</option>
                <option value="SKT">SKT</option>
                <option value="KT">KT</option>
                <option value="LGU+">LG U+</option>
              </select>
              <input
                type="text"
                placeholder="핸드폰 번호"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
            </div>
          </div>
        );
      case "qr":
        return (
          <div className="payment-tab-content">
            <h4>QR코드 결제</h4>
            <p>아래 QR코드를 스캔하거나 버튼을 눌러 결제 페이지로 이동하세요.</p>
            <div className="qr-code-container">
              <img src="/images/qr_code.jpg" alt="QR코드" />
            </div>
            <a
              href={qrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="qr-payment-link"
            >
              QR코드 결제하기
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  // 카드 결제 옵션 배열 (이미지 파일들은 public/images 폴더에 저장되어야 합니다)
  const cardOptions = [
    { value: "국민카드", img: "/images/국민카드.jpg" },
    { value: "신한카드", img: "/images/신한카드.jpg" },
    { value: "농협카드", img: "/images/농협카드.gif" },
    { value: "현대카드", img: "/images/현대카드.jpg" },
    { value: "삼성카드", img: "/images/삼성카드.jpg" },
    { value: "롯데카드", img: "/images/롯데카드.jpg" },
    { value: "카카오페이", img: "/images/카카오페이.png" },
    { value: "네이버페이", img: "/images/네이버페이.png" },
    { value: "국민은행", img: "/images/국민은행.jpg" },
    { value: "신한은행", img: "/images/신한은행.png" },
    { value: "기업은행", img: "/images/기업은행.png" },
    { value: "농협은행", img: "/images/농협은행.jpg" },
  ];

  return (
    <div className="payment-screen-modal">
      <div className="payment-screen">
        <h3>결제 수단 선택</h3>
        <p className="total-amount">
          총 결제 금액: <strong>{totalAmount.toLocaleString()}원</strong>
        </p>

        {/* 탭 버튼 영역 */}
        <div className="payment-tabs">
          <button
            className={selectedTab === "card" ? "active" : ""}
            onClick={() => handleTabChange("card")}
          >
            카드결제
          </button>
          <button
            className={selectedTab === "phone" ? "active" : ""}
            onClick={() => handleTabChange("phone")}
          >
            핸드폰결제
          </button>
          <button
            className={selectedTab === "qr" ? "active" : ""}
            onClick={() => handleTabChange("qr")}
          >
            QR코드결제
          </button>
        </div>

        {/* 탭별 내용 */}
        {renderTabContent()}

        {/* 버튼 영역 */}
        <div className="payment-actions">
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
          <button className="confirm-button" onClick={handleConfirmPayment}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
