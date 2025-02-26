import React, { useState } from "react";
import PaymentPanel from "./PaymentPanel"; // PaymentPanel 경로 (파일명, 경로는 프로젝트에 맞게 조정)
import PaymentScreen from "../forms/PaymentScreen"; // PaymentScreen 경로

const PaymentModalManager = () => {
  // 처음에는 포인트 충전 모달(PaymentPanel)을 보여줍니다.
  const [showPaymentPanel, setShowPaymentPanel] = useState(true);
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  // PaymentPanel에서 결제 완료 버튼 클릭 시 onClose(totalAmount)가 호출됩니다.
  const handlePanelClose = (amount) => {
    console.log("PaymentPanel closed, totalAmount:", amount);
    setTotalAmount(amount);
    setShowPaymentPanel(false);
    setShowPaymentScreen(true); // PaymentScreen 모달 열기
  };

  // PaymentScreen 모달 닫기
  const handleScreenClose = () => {
    setShowPaymentScreen(false);
  };

  return (
    <>
      {showPaymentPanel && (
        <PaymentPanel onClose={handlePanelClose} />
      )}
      {showPaymentScreen && (
  <>
    {console.log("PaymentScreen should be rendered now. totalAmount:", totalAmount)}
    <PaymentScreen totalAmount={totalAmount} onClose={handleScreenClose} />
  </>
)}
    </>
  );
};

export default PaymentModalManager;
