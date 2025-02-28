import React, { useState } from "react";
import "../../styled/CheckCardModal.css";
import PaymentSuccessModal from "./PaymentSuccessModal";

const CheckCardModal = ({ totalAmount, onClose }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cardPassword, setCardPassword] = useState("");

  // 결제 성공 모달 표시 여부
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 포인트 적립 예시 (10% 가정)
  const [earnedPoints, setEarnedPoints] = useState(0);
  // 결제 사용 날짜
  const [usedDate, setUsedDate] = useState("");

  const handleConfirm = () => {
    if (!cardNumber || !accountNumber || !cardPassword) {
      alert("카드번호, 계좌번호, 카드비밀번호를 모두 입력해주세요.");
      return;
    }

    // 실제 결제 로직(스프링 부트 API 등) 가능
    // 여기서 포인트 적립 계산 + 날짜 기록
    const points = Math.floor(totalAmount * 0.1);
    setEarnedPoints(points);
    setUsedDate(new Date().toLocaleString());

    // 결제 성공 모달 표시
    setShowSuccessModal(true);
  };

  // 결제 성공 모달 닫기
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    // 최종 모달 닫기
    onClose();
  };

  // 결제 성공 모달이 열려있으면, 카드 입력창 대신 성공 모달 표시
  if (showSuccessModal) {
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
          placeholder="계좌번호 (숫자만)"
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
