import React, { useState } from "react";
import "../../styled/PaymentScreen.css";
import CreditCardModal from "./CreditCardModal";
import CheckCardModal from "./CheckCardModal";
import KakaoQRModal from "./KakaoQRModal";
import NaverPayModal from "./NaverPayModal";
import PaymentSuccessModal from "./PaymentSuccessModal";

const PaymentScreen = ({ totalAmount, onClose }) => {
  const [selectedTab, setSelectedTab] = useState("card");
  const [selectedCardOption, setSelectedCardOption] = useState("");

  // 핸드폰 결제 관련 상태
  const [selectedCarrier, setSelectedCarrier] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [sentAuthCode, setSentAuthCode] = useState("");
  const [isAuthVerified, setIsAuthVerified] = useState(false);

  // 보안코드 상태
  const [securityCode, setSecurityCode] = useState("");
  const [exampleSecurityCode, setExampleSecurityCode] = useState("1234");

  // 개인정보 동의
  const [privacyConsent, setPrivacyConsent] = useState("");

  // 모달 상태
  const [showCreditCardModal, setShowCreditCardModal] = useState(false);
  const [showCheckCardModal, setShowCheckCardModal] = useState(false);
  const [showKakaoQRModal, setShowKakaoQRModal] = useState(false);
  const [kakaoQRDefaultTab, setKakaoQRDefaultTab] = useState("kakao");
  const [showNaverPayModal, setShowNaverPayModal] = useState(false);

  // 결제 성공 모달 상태 및 관련 데이터
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);

  /**
   * 핵심: 
   *  - basePoints = 결제금액(예: 5,000)
   *  - bonusPoints = 결제금액 + 결제금액의 10%(예: 5,500)
   */
  const [basePoints, setBasePoints] = useState(0);    
  const [bonusPoints, setBonusPoints] = useState(0);
  const [usedDate, setUsedDate] = useState("");

  const qrUrl = "https://example.com/qr-payment"; //  QR코드 URL주소

  /** 탭 전환 */
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  /** 인증번호 발송 (가상) */
  const sendAuthCode = () => {
    if (!selectedCarrier || !phoneNumber) {
      alert("통신사와 핸드폰 번호를 먼저 입력해주세요.");
      return;
    }
    const generatedCode = "123456";
    setSentAuthCode(generatedCode);
    setIsAuthVerified(false);
    alert(`인증번호 발송 (테스트코드: ${generatedCode})`);
  };

  /** 인증번호 확인 */
  const verifyAuthCode = () => {
    if (authCode && authCode === sentAuthCode) {
      alert("인증이 완료되었습니다!");
      setIsAuthVerified(true);
    } else {
      alert("인증번호가 올바르지 않습니다.");
      setIsAuthVerified(false);
    }
  };

  /** 보안코드 새로고침 (↻) */
  const refreshSecurityCode = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setExampleSecurityCode(randomCode);
    setSecurityCode("");
  };

  /**
   * 결제하기 버튼 클릭 시
   * - 카드 결제는 별도 모달에서 처리
   * - 핸드폰/QR 결제 시 아래 로직으로 포인트 계산 후 결제 성공 모달 표시
   */
  const handleConfirmPayment = () => {
    // 1) 카드 결제
    if (selectedTab === "card") {
      if (!selectedCardOption) {
        alert("카드 결제 수단을 선택해주세요.");
        return;
      }
      const creditCardList = [
        "국민카드",
        "신한카드",
        "농협카드",
        "현대카드",
        "삼성카드",
        "롯데카드",
      ];
      const checkCardList = ["국민은행", "신한은행", "기업은행", "농협은행"];

      if (selectedCardOption === "카카오페이") {
        setKakaoQRDefaultTab("kakao");
        setShowKakaoQRModal(true);
        return;
      } else if (selectedCardOption === "네이버페이") {
        setShowNaverPayModal(true);
        return;
      } else if (selectedCardOption === "QR코드") {
        setKakaoQRDefaultTab("qr");
        setShowKakaoQRModal(true);
        return;
      } else if (creditCardList.includes(selectedCardOption)) {
        setShowCreditCardModal(true);
        return;
      } else if (checkCardList.includes(selectedCardOption)) {
        setShowCheckCardModal(true);
        return;
      }
    }

    // 2) 핸드폰 결제
    else if (selectedTab === "phone") {
      if (!selectedCarrier || !phoneNumber) {
        alert("휴대폰 결제 정보를 모두 입력해주세요.");
        return;
      }
      if (!isAuthVerified) {
        alert("휴대폰 인증을 완료해주세요.");
        return;
      }
      if (!securityCode) {
        alert("보안코드를 입력해주세요.");
        return;
      }
      if (securityCode !== exampleSecurityCode) {
        alert("보안코드가 일치하지 않습니다.");
        return;
      }
      if (privacyConsent !== "agree") {
        alert("개인정보 동의가 필요합니다.");
        return;
      }

      // [핵심] basePoints(= 결제금액), bonusPoints(= 결제금액 + 결제금액의 10%)
      const base = totalAmount; 
      const bonus = base + Math.floor(base * 0.1); // 예) 5,000 + 500 => 5,500

      setBasePoints(base);
      setBonusPoints(bonus);

      // 결제일시 포맷
      setUsedDate(getFormattedDate());

      setShowPaymentSuccessModal(true);
      return;
    }

    // 3) QR 결제
    else if (selectedTab === "qr") {
      const base = totalAmount;
      const bonus = base + Math.floor(base * 0.1);

      setBasePoints(base);
      setBonusPoints(bonus);
      setUsedDate(getFormattedDate());

      setShowPaymentSuccessModal(true);
      return;
    }

    // 그 외
    alert(`결제 완료! 충전 금액: ${totalAmount.toLocaleString()}원`);
    onClose();
  };

  /** 결제일시 포맷 함수(예: 2025. 2. 28. 오전 10:46:51) */
  const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    let hour = now.getHours();
    let ampm = "오전";
    if (hour >= 12) {
      ampm = "오후";
      if (hour > 12) hour -= 12;
    }
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");

    return `${year}. ${month}. ${day}. ${ampm} ${hour}:${minute}:${second}`;
  };

  //  페이지창 실제 디자인

  /** 카드 결제 탭 내용 */
  const renderCardPayment = () => (
    <div className="payment-tab-content">
      <h4>신용/체크카드 결제</h4>
      <p>아래에서 카드사 / 은행 / 페이 옵션을 선택해주세요.</p>
      <div className="card-options-grid">
        {cardOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`card-option ${
              selectedCardOption === option.value ? "selected" : ""
            }`}
            onClick={() => setSelectedCardOption(option.value)}
          >
            <img src={option.img} alt={option.value} />
            <span>{option.value}</span>
          </button>
        ))}
      </div>
    </div>
  );

  /** 핸드폰 결제 탭 내용 */
  const renderPhonePayment = () => (
    <div className="payment-tab-content">
      <h4>핸드폰결제</h4>
      <p>통신사와 휴대폰 번호를 입력해주세요.</p>

      <div className="phone-row">
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

        <button className="send-auth-button" onClick={sendAuthCode}>
          인증번호 보내기
        </button>
      </div>

      <div className="auth-row">
        <input
          type="text"
          placeholder="인증번호 입력"
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value.replace(/[^0-9]/g, ""))}
        />
        <button className="verify-auth-button" onClick={verifyAuthCode}>
          인증확인
        </button>
      </div>

      <div className="security-row">
        <input
          type="text"
          placeholder="보안코드"
          value={securityCode}
          onChange={(e) =>
            setSecurityCode(e.target.value.replace(/[^0-9]/g, ""))
          }
        />
        <span className="example-security-code">예: {exampleSecurityCode}</span>
        <button className="refresh-icon-button" onClick={refreshSecurityCode}>
          ↻
        </button>
      </div>

      <div className="privacy-consent">
        <label>
          <input
            type="radio"
            name="privacy"
            value="agree"
            checked={privacyConsent === "agree"}
            onChange={(e) => setPrivacyConsent(e.target.value)}
          />
          개인정보 동의
        </label>
        <label style={{ marginLeft: "10px" }}>
          <input
            type="radio"
            name="privacy"
            value="disagree"
            checked={privacyConsent === "disagree"}
            onChange={(e) => setPrivacyConsent(e.target.value)}
          />
          동의 안 함
        </label>
      </div>
    </div>
  );

  /** QR 결제 탭 내용 */
  const renderQRPayment = () => (
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
        {/* QR코드 결제하기 */}
      </a>
    </div>
  );

  /** 탭별 렌더링 */
  const renderTabContent = () => {
    switch (selectedTab) {
      case "card":
        return renderCardPayment();
      case "phone":
        return renderPhonePayment();
      case "qr":
        return renderQRPayment();
      default:
        return null;
    }
  };

  // 카드/은행/페이 목록
  const cardOptions = [
    { value: "국민카드", img: "/images/국민카드.jpg" },
    { value: "신한카드", img: "/images/신한카드.jpg" },
    { value: "농협카드", img: "/images/농협카드.gif" },
    { value: "현대카드", img: "/images/현대카드.jpg" },
    { value: "삼성카드", img: "/images/삼성카드.jpg" },
    { value: "롯데카드", img: "/images/롯데카드.jpg" },
    { value: "카카오페이", img: "/images/카카오페이.png" },
    { value: "네이버페이", img: "/images/네이버페이.png" },
    // { value: "QR코드", img: "/images/qr_code.jpg" }, // 필요 시 추가
    { value: "국민은행", img: "/images/국민은행.jpg" },
    { value: "신한은행", img: "/images/신한은행.png" },
    { value: "기업은행", img: "/images/기업은행.png" },
    { value: "농협은행", img: "/images/농협은행.jpg" },
  ];

  /** 모달 닫기 콜백들 */
  const handleCreditCardModalClose = () => {
    setShowCreditCardModal(false);
    onClose();
  };
  const handleCheckCardModalClose = () => {
    setShowCheckCardModal(false);
    onClose();
  };
  const handleKakaoQRModalClose = () => {
    setShowKakaoQRModal(false);
    onClose();
  };
  const handleNaverPayModalClose = () => {
    setShowNaverPayModal(false);
    onClose();
  };

  // 결제 성공 모달
  if (showPaymentSuccessModal) {
    return (
      <PaymentSuccessModal
        basePoints={basePoints}    // 예) 5,000
        bonusPoints={bonusPoints}  // 예) 5,500
        usedDate={usedDate}
        onClose={() => {
          setShowPaymentSuccessModal(false);
          onClose();
        }}
      />
    );
  }

  return (
    <div className="payment-screen-modal">
      <div className="payment-screen">
        <h3>결제 수단 선택</h3>
        <p className="total-amount">
          총 결제 금액: <strong>{totalAmount.toLocaleString()}원</strong>
        </p>

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

        {renderTabContent()}

        <div className="payment-actions">
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
          <button className="confirm-button" onClick={handleConfirmPayment}>
            결제하기
          </button>
        </div>
      </div>

      {/* 모달들 */}
      {showCreditCardModal && (
        <CreditCardModal
          totalAmount={totalAmount}
          onClose={handleCreditCardModalClose}
        />
      )}
      {showCheckCardModal && (
        <CheckCardModal
          totalAmount={totalAmount}
          onClose={handleCheckCardModalClose}
        />
      )}
      {showKakaoQRModal && (
        <KakaoQRModal
          defaultTab={kakaoQRDefaultTab}
          totalAmount={totalAmount}
          onClose={handleKakaoQRModalClose}
        />
      )}
      {showNaverPayModal && (
        <NaverPayModal
          totalAmount={totalAmount}
          onClose={handleNaverPayModalClose}
        />
      )}
    </div>
  );
};

export default PaymentScreen;
