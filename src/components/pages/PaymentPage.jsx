import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styled/PaymentPage.css";

const PaymentPage = () => {
  const [amount, setAmount] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    if (amount <= 0) {
      alert("충전할 금액을 입력하세요.");
      return;
    }
    setShowQR(true);
  };

  const completePayment = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/charge-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1, amount }), // userId는 로그인된 유저 정보로 변경 필요
      });

      if (response.ok) {
        alert("포인트 충전 완료!");
        navigate("/mypage");
      } else {
        alert("충전에 실패했습니다.");
      }
    } catch (error) {
      console.error("결제 오류:", error);
    }
  };

  return (
    <div className="payment-container">
      <h2>포인트 충전</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="충전할 금액 입력"
      />
      <button onClick={handlePayment}>결제하기</button>

      {showQR && (
        <div className="qr-modal">
          <p>카카오페이 결제 QR코드 (임시)</p>
          <button onClick={completePayment}>X (결제 완료)</button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
