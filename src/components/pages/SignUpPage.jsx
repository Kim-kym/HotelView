import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styled/SingUpPage.css";

function SignUpPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [ssn, setSsn] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setErrorMessage("");
    }
  }, [password, confirmPassword]);

  const handleRegister = async (e) => {
    e.preventDefault(); // ✅ 폼 제출 시 새로고침 방지

    /* 비밀번호 확인 */
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8050/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          password,
          name,
          nickname,
          ssn,
          phone,
          address,
          reference: reference || null, // `null` 허용
          marketingOptIn: marketingOptIn ? 1 : 0, // `0` 또는 `1`로 변환
        }),
      });

      if (response.ok) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        alert("회원가입 실패. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <form className="signup-form" onSubmit={handleRegister}>
        <div className="input-group">
          <input
            type="email"
            placeholder="이메일"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            autoComplete="email"
          />
          <button type="button">중복 확인</button>
        </div>

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrorMessage(""); // 🔹 사용자가 입력을 변경하면 오류 메시지 초기화
          }} 
          required
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="input-group">
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button type="button">중복 확인</button>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="주민등록번호"
            value={ssn}
            onChange={(e) => setSsn(e.target.value)}
          />
          <button type="button">중복 확인</button>
        </div>

        <div className="input-group">
          <input
            type="tel"
            placeholder="전화번호"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
          <button type="button">중복 확인</button>
        </div>

        <input
          type="text"
          placeholder="주소"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="추천인 (선택사항)"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={marketingOptIn}
            onChange={(e) => setMarketingOptIn(e.target.checked)}
          />
          마케팅 정보 수신 동의
        </label>
        <button className="submit-button" type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
