import React, {useState} from "react";
import "../../styled/PaymentScreen.css";


const PaymentScreen = ({ totalAmount, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState("credit");

  const renderPaymentContent = () => {
    switch (selectedMethod) {
      case "credit":
        return (
          <div className="payment-method-content">
            <h4>신용카드 결제</h4>
            <p>신용카드 정보를 입력해주세요.</p>
            <input type="text" placeholder="카드번호" />
            <input type="text" placeholder="만료일 (MM/YY)" />
            <input type="text" placeholder="CVC" />
          </div>
        );
      case "debit":
        return (
          <div className="payment-method-content">
            <h4>체크카드 결제</h4>
            <p>체크카드 정보를 입력해주세요.</p>
            <input type="text" placeholder="카드번호" />
            <input type="text" placeholder="만료일 (MM/YY)" />
            <input type="text" placeholder="비밀번호 앞 2자리" />
          </div>
        );
      case "transfer":
        return (
          <div className="payment-method-content">
            <h4>계좌이체 결제</h4>
            <p>계좌이체 정보를 입력해주세요.</p>
            <input type="text" placeholder="은행명" />
            <input type="text" placeholder="계좌번호" />
          </div>
        );
      case "qr":
        return (
          <div className="payment-method-content">
            <h4>QR코드 결제</h4>
            <p>QR코드를 스캔하여 결제해주세요.</p>
            <div className="qr-code-placeholder">QR CODE IMAGE</div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleConfirmPayment = () => {
    // 여기서 결제 처리 로직 추가 가능
    alert(`결제 완료! 충전 금액: ${totalAmount.toLocaleString()}원`);
    onClose();
  };

  return (
    <div className="payment-screen-modal">
      <div className="payment-screen">
        <h3>결제 수단 선택</h3>
        <p className="total-amount">
          총 결제 금액: <strong>{totalAmount.toLocaleString()}원</strong>
        </p>
        <div className="payment-method-tabs">
          <button
            className={selectedMethod === "credit" ? "active" : ""}
            onClick={() => setSelectedMethod("credit")}
          >
            신용카드
          </button>
          <button
            className={selectedMethod === "debit" ? "active" : ""}
            onClick={() => setSelectedMethod("debit")}
          >
            체크카드
          </button>
          <button
            className={selectedMethod === "transfer" ? "active" : ""}
            onClick={() => setSelectedMethod("transfer")}
          >
            계좌이체
          </button>
          <button
            className={selectedMethod === "qr" ? "active" : ""}
            onClick={() => setSelectedMethod("qr")}
          >
            QR코드
          </button>
        </div>

        <div className="payment-content">{renderPaymentContent()}</div>

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