import React, { useState } from "react";
import "../../styled/CheckCardModal.css";
import PaymentSuccessModal from "./PaymentSuccessModal";

const CheckCardModal = ({ totalAmount, onClose }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cardPassword, setCardPassword] = useState("");

  // 결제 성공 모달 표시 여부
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // ★ basePoints, bonusPoints, usedDate
  const [basePoints, setBasePoints] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [usedDate, setUsedDate] = useState("");

  const handleConfirm = () => {
    if (!cardNumber || !accountNumber || !cardPassword) {
      alert("카드번호, 계좌번호, 카드비밀번호를 모두 입력해주세요.");
      return;
    }

    // 결제 로직 후 포인트 계산
    const base = totalAmount;
    const bonus = base + Math.floor(base * 0.1); // 예: 5000 + 500 = 5500

    setBasePoints(base);
    setBonusPoints(bonus);
    setUsedDate(new Date().toLocaleString());

    // 결제 성공 모달 표시
    setShowSuccessModal(true);
  };

  // 결제 성공 모달 닫기
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onClose(); // 최종 모달 닫기
  };

  // 결제 성공 모달 열렸을 때
  if (showSuccessModal) {
    return (
      <PaymentSuccessModal
        basePoints={basePoints}
        bonusPoints={bonusPoints}
        usedDate={usedDate}
        onClose={handleSuccessClose}
      />
    );
  }

  return (
    <div className="checkcard-modal-overlay">
      <div className="checkcard-modal">
        <h3>체크카드 결제 정보</h3>
        <p>아래 정보를 입력해주세요.</p>

        <input
          type="text"
          placeholder="카드번호 (숫자만)"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, ""))}
        />

        <input
          type="text"
          placeholder="카드 유효기간 (숫자만)"
          value={accountNumber}
          onChange={(e) =>
            setAccountNumber(e.target.value.replace(/[^0-9]/g, ""))
          }
        />

        <input
          type="password"
          placeholder="카드비밀번호"
          value={cardPassword}
          onChange={(e) => setCardPassword(e.target.value)}
        />

        <div className="checkcard-button-group">
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

export default CheckCardModal;
