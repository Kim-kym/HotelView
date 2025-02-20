import { useState, useEffect } from "react";
import "../../styled/MyPage.css";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const [userInfo, setUserInfo] = useState({});
  const [showPointHistory, setShowPointHistory] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8020/user/mypage", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data))
      .catch((err) => console.error("마이페이지 정보 불러오기 실패:", err));
  }, []);

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>
      <div className="mypage-info">
        <p>
          <strong>닉네임:</strong> {userInfo.nickname}
        </p>
        <p>
          <strong>포인트:</strong> {userInfo.points} P
        </p>
        <p>
          <strong>회원 등급:</strong> {userInfo.rank}
        </p>
        <p>
          <strong>호텔 예약 내역:</strong>{" "}
          {userInfo.reservations ? userInfo.reservations.length + "건" : "없음"}
        </p>
      </div>

      <div className="mypage-buttons">
        <button onClick={() => setShowPointHistory(true)}>
          포인트 히스토리
        </button>
        <button onClick={() => navigate("/payment")}>포인트 충전</button>
        <button>정보 수정</button>
      </div>

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

      <div className="mypage-coupons">
        <h3>쿠폰 정보</h3>
        {userInfo.coupons?.length ? (
          <ul>
            {userInfo.coupons.map((coupon, index) => (
              <li key={index}>
                {coupon.name} - {coupon.discount}% 할인
              </li>
            ))}
          </ul>
        ) : (
          <p>보유한 쿠폰 없음</p>
        )}
      </div>
    </div>
  );
}

export default MyPage;
