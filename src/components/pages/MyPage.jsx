import { useState, useEffect } from "react";
import "../../styled/MyPage.css";
import { useNavigate } from "react-router-dom";
import userDummy from "./UserDummy";
import PaymentPanel from "../forms/PaymentPanel";

function MyPage() {
  const [userInfo, setUserInfo] = useState({});
  const [showPointHistory, setShowPointHistory] = useState(false);
  const [showPaymentPanel, setShowPaymentPanel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUserInfo(userDummy);
    console.log("MyPage - userInfo 상태 업데이트:", userDummy);
  }, []);

  // 실 사용 코드
  // useEffect(() => {
  //   fetch("http://localhost:8050/user/mypage", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setUserInfo(data))
  //     .catch((err) => console.error("마이페이지 정보 불러오기 실패:", err));
  // }, []);


  return (
<div className="mypage-wrapper">
      {/* ✅ 마이페이지 본문 */}
      <div className="mypage-container">
        <div className="mypage-header">
          <h2>마이페이지</h2>
          <button className="edit-button">정보 수정</button>
        </div>

        <div className="mypage-info">
          <p><strong>닉네임:</strong> {userInfo.nickname}</p>

          {/* ✅ 포인트 정보 + 버튼을 한 줄로 정렬 */}
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
              <button onClick={() => setShowPointHistory(true)}>포인트 히스토리</button>
              <button 
                onClick={() => {
                  console.log("Before click:", showPaymentPanel);
                  setShowPaymentPanel(!showPaymentPanel); // ✅ 패널 표시 여부 토글
                  console.log("After click:", !showPaymentPanel);
                }}
              >
                포인트 충전
              </button>
            </div>
          </div>

          <p><strong>회원 등급:</strong> {userInfo.rank}</p>
          <p><strong>호텔 예약 내역:</strong> {userInfo.reservations ? userInfo.reservations.length + "건" : "없음"}</p>
        </div>

        {/* ✅ 포인트 히스토리 팝업 */}
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

      {/* ✅ 마이페이지 옆에 결제 패널 추가 */}
      {showPaymentPanel && (
        <div className="payment-panel-wrapper open">
          <PaymentPanel onClose={() => setShowPaymentPanel(false)} />
        </div>
      )}
    </div>
  );
}

export default MyPage;
