import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styled/PaymentPanel.css";

const PaymentPanel = ({ onClose }) => {
  const [selectedAmounts, setSelectedAmounts] = useState([]);
  const [customAmount, setCustomAmount] = useState(""); // ✅ 직접 입력 금액 추가
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();
  const presetAmounts = [5000, 10000, 50000, 100000];

  const handleCheckboxChange = (value) => {
    if (showCustomInput) return; // ✅ 직접 입력 모드일 때는 다른 체크 불가
    setSelectedAmounts((prev) =>
      prev.includes(value)
        ? prev.filter((amt) => amt !== value)
        : [...prev, value]
    );
  };

  const handleCustomCheckboxChange = () => {
    if (!showCustomInput) {
      // ✅ 직접 입력을 선택하면 기존 체크박스 해제
      setSelectedAmounts([]);
    }
    setShowCustomInput(!showCustomInput);
    setCustomAmount(""); // ✅ 체크 해제 시 입력값 초기화
  };

  const handleCustomAmountChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, ""); // ✅ 숫자만 입력 가능
    setCustomAmount(value);
  };

  const totalAmount =
    (showCustomInput && customAmount ? parseInt(customAmount, 10) : 0) +
    (showCustomInput ? 0 : selectedAmounts.reduce((sum, val) => sum + val, 0));

  const handlePayment = () => {
    if (totalAmount === 0) {
      alert("충전할 금액을 선택하거나 입력하세요!");
      return;
    }
    setShowQR(true);
  };

  const completePayment = async () => {
    if (totalAmount <= 0) {
      alert("충전할 금액을 선택하세요.");
      return;
    }

    try {
      // 🔥🔥 스프링 부트 연동 시 주석 해제! 🔥🔥
      /*
      const response = await fetch("http://localhost:8050/user/charge-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1, amount: totalAmount }),
      });

      if (response.ok) {
        alert("포인트 충전 완료!");
        setShowQR(false);
        onClose();
        navigate("/mypage");
      } else {
        alert("충전에 실패했습니다.");
      }
      */

      // ✅ 더미 데이터로 확인 (스프링 연결 전)
      alert(`충전 완료! 충전 금액: ${totalAmount.toLocaleString()}원`);
      setShowQR(false);
      onClose();
    } catch (error) {
      console.error("결제 오류:", error);
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="payment-panel">
      <h3>포인트 충전</h3>

      {/* ✅ 기존 체크박스 선택 */}
      <div className="checkbox-options">
        {presetAmounts.map((value) => (
          <div key={value} className="checkbox-item">
            <input
              type="checkbox"
              id={`amount-${value}`}
              checked={selectedAmounts.includes(value)}
              onChange={() => handleCheckboxChange(value)}
              disabled={showCustomInput} // ✅ 직접 입력 선택 시 비활성화
            />
            <label htmlFor={`amount-${value}`}>
              {value.toLocaleString()}원
            </label>
          </div>
        ))}

        {/* ✅ 직접 입력 체크박스 */}
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="custom-amount"
            checked={showCustomInput}
            onChange={handleCustomCheckboxChange}
          />
          <label htmlFor="custom-amount">직접 입력</label>
        </div>
      </div>

      {/* ✅ 선택하면 입력창이 나타남 */}
      {showCustomInput && (
        <div className="custom-amount">
          <input
            type="text"
            placeholder="원하는 금액 입력"
            value={customAmount}
            onChange={handleCustomAmountChange}
          />
        </div>
      )}

      <p className="total-amount">
        총 결제 금액: <strong>{totalAmount.toLocaleString()}원</strong>
      </p>

      <div className="panel-buttons">
        <button className="close-button" onClick={onClose}>
          X 닫기
        </button>
        <button className="confirm-button" onClick={handlePayment}>
          결제 완료
        </button>
      </div>

      {/* ✅ QR 코드 모달 추가 */}
      {showQR && (
        <div className="qr-modal">
          <div className="qr-content">
            <p>카카오페이 결제 QR코드 (임시)</p>
            <button onClick={completePayment}>X (결제 하기)</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPanel;
