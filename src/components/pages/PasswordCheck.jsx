import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userDummy from "../pages/UserDummy"; // ✅ 유저 더미 데이터 불러오기
import "../../styled/PasswordCheck.css"; // ✅ 기존 CSS 유지

const PasswordCheck = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ 현재 로그인된 유저 찾기 (여기서는 ID 1번을 로그인된 유저로 가정)
  const currentUser = userDummy.find((user) => user.id === 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      setError("로그인된 사용자가 없습니다.");
      return;
    }

    // ✅ 입력한 비밀번호와 더미 데이터의 비밀번호 비교
    if (password === currentUser.password) {
      alert("비밀번호 확인 완료!"); // ✅ 확인용 알림
      navigate("/mypage/edit"); // ✅ 수정 페이지로 이동
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="password-check-wrapper">
      <div className="password-check-container">
        <h2>비밀번호 확인</h2>
        <form onSubmit={handleSubmit} className="password-input-container">
          <label htmlFor="password">비밀번호 입력</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
          <div className="password-check-buttons">
            <button type="button" onClick={() => navigate("/mypage")}>
              취소
            </button>
            <button type="submit">확인</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordCheck;
