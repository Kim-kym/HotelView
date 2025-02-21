import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styled/PaymentPanel.css";

const PaymentPanel = ({ onClose }) => {
  const [selectedAmounts, setSelectedAmounts] = useState([]);
  const [showQR, setShowQR] = useState(false); // ✅ QR 코드 모달 상태 추가
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 useNavigate
  const presetAmounts = [5000, 10000, 50000, 100000];

  const handleCheckboxChange = (value) => {
    setSelectedAmounts((prev) =>
      prev.includes(value) ? prev.filter((amt) => amt !== value) : [...prev, value]
    );
  };

  const totalAmount = selectedAmounts.reduce((sum, val) => sum + val, 0);

  const handlePayment = () => {
    if (totalAmount === 0) {
      alert("충전할 금액을 선택하세요!");
      return;
    }
    setShowQR(true); // ✅ 결제 버튼 클릭 시 QR 코드 모달 표시
  };

  const completePayment = async () => {
    if (totalAmount <= 0) {
      alert("충전할 금액을 선택하세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8050/user/charge-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1, amount: totalAmount }), // ✅ userId는 실제 로그인된 유저 정보로 변경해야 함
      });

      if (response.ok) {
        alert("포인트 충전 완료!");
        setShowQR(false); // ✅ QR 코드 모달 닫기
        onClose(); // ✅ 결제 패널 닫기
        navigate("/mypage"); // ✅ 마이페이지로 이동
      } else {
        alert("충전에 실패했습니다.");
      }
    } catch (error) {
      console.error("결제 오류:", error);
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="payment-panel">
      <h3>포인트 충전</h3>

      <div className="checkbox-options">
        {presetAmounts.map((value) => (
          <div key={value} className="checkbox-item">
            <input
              type="checkbox"
              id={`amount-${value}`}
              checked={selectedAmounts.includes(value)}
              onChange={() => handleCheckboxChange(value)}
            />
            <label htmlFor={`amount-${value}`}>{value.toLocaleString()}원</label>
          </div>
        ))}
      </div>

      <p className="total-amount">총 결제 금액: <strong>{totalAmount.toLocaleString()}원</strong></p>

      <div className="panel-buttons">
        <button className="close-button" onClick={onClose}>X 닫기</button>
        <button className="confirm-button" onClick={handlePayment}>결제 완료</button>
      </div>

      {/* ✅ QR 코드 모달 추가 */}
      {showQR && (
        <div className="qr-modal">
          <div className="qr-content">
            <p>카카오페이 결제 QR코드 (임시)</p>
            <button onClick={completePayment}>X (결제 완료)</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPanel;
