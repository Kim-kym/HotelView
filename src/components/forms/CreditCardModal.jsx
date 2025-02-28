import React, { useState } from "react";
import "../../styled/CreditCardModal.css";
import PaymentSuccessModal from "./PaymentSuccessModal";

const CreditCardModal = ({ totalAmount, onClose }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardPassword, setCardPassword] = useState("");
  const [cvc, setCvc] = useState("");

  // 결제 성공 모달
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // ★ basePoints, bonusPoints, usedDate
  const [basePoints, setBasePoints] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [usedDate, setUsedDate] = useState("");

  const handleConfirm = () => {
    if (!cardNumber || !cardPassword || !cvc) {
      alert("카드번호, 비밀번호, CVC를 모두 입력해주세요.");
      return;
    }
    // 결제 후 포인트 계산
    const base = totalAmount;
    const bonus = base + Math.floor(base * 0.1);
    setBasePoints(base);
    setBonusPoints(bonus);
    setUsedDate(new Date().toLocaleString());

    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onClose(); // 최종 모달 닫기
  };

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
