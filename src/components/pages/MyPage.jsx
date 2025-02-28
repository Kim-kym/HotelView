import { useState, useEffect } from "react";
import axios from "axios"
import "../../styled/MyPage.css";
import { useNavigate } from "react-router-dom";
import userDummy from "./UserDummy";
import PaymentPanel from "../forms/PaymentPanel";
import PaymentScreen from "../forms/PaymentScreen";

function MyPage() {
  const [userInfo, setUserInfo] = useState({});
  const [showPointHistory, setShowPointHistory] = useState(false);
  const [showPaymentPanel, setShowPaymentPanel] = useState(false);
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // ★ 실제 백엔드 API 호출 (예: /api/mypage)
    axios
      .get("http://localhost:8050/api/mypage", { withCredentials: true })
      .then((res) => {
        // 백엔드에서 받은 유저 정보를 state에 저장
        setUserInfo(res.data);
        console.log("MyPage - userInfo 상태 업데이트 (API):", res.data);
      })
      .catch((err) => {
        console.error("마이페이지 API 오류:", err);
        // 예: 에러 시 fallback으로 userDummy 사용 가능 (선택 사항)
        // setUserInfo(userDummy);
      });
  }, []);

  return (
    <div className={`mypage-wrapper ${showPaymentPanel ? "panel-active" : ""}`}>
      {/* 마이페이지 본문 */}
      <div className="mypage-container">
        <div className="mypage-header">
          <h2>마이페이지</h2>
          <button
            className="edit-button"
            onClick={() => navigate("/mypage/password-check")}
          >
            정보 수정
          </button>
        </div>

        <div className="mypage-info">
          <p>
            <strong>닉네임:</strong> {userInfo.nickname}
          </p>

          {/* 포인트 정보와 버튼을 한 줄로 정렬 */}
          <div className="point-section">
            <div className="point-wrapper">
              <strong>포인트:</strong>
              <div className="point-container">
                <span className="point-value">
                  {userInfo.points !== undefined ? userInfo.points : 0}P
                </span>
                <span className="point-underline"></span>
              </div>
            </div>
            <div className="point-buttons">
              <button onClick={() => setShowPointHistory(true)}>
                히스토리
              </button>
              <button
                onClick={() => {
                  console.log("Before click:", showPaymentPanel);
                  setShowPaymentPanel(true);
                  console.log("After click:", true);
                }}
              >
                충전
              </button>
            </div>
          </div>

          <p>
            <strong>회원 등급:</strong> {userInfo.rank}
          </p>
          <p>
            <strong>호텔 예약 내역:</strong>{" "}
            {userInfo.reservations
              ? userInfo.reservations.length + "건"
              : "없음"}
          </p>
        </div>

        {/* 포인트 히스토리 팝업 */}
        {showPointHistory && (
          <div className="point-history-popup">
            <div className="popup-content">
              <h3>포인트 사용 내역</h3>
              <ul>
                {userInfo.pointHistory?.map((point, index) => (
                  <li key={index}>
                    {point.date} - {point.amount} P
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowPointHistory(false)}>X</button>
            </div>
          </div>
        )}
      </div>

      {/* PaymentPanel (충전 모달) */}
      {showPaymentPanel && (
        <div className="payment-panel-wrapper open">
          <PaymentPanel
            onClose={(amount) => {
              if (amount > 0) {
                setTotalAmount(amount);
                setShowPaymentPanel(false);
                setShowPaymentScreen(true);
              } else {
                setShowPaymentPanel(false);
              }
            }}
          />
        </div>
      )}

      {/* PaymentScreen (결제 수단 모달) */}
      {showPaymentScreen && (
        <div className="payment-screen-wrapper open">
          <PaymentScreen
            totalAmount={totalAmount}
            onClose={() => {
              setShowPaymentScreen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default MyPage;
