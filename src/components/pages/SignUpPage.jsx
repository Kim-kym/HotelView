import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styled/SignupPage.css";

function SignUpPage() {
  const [userData, setUserData] = useState({
    email: "",
    nickname: "",
    phone: "",
    ssn: "",
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const [checkResult, setCheckResult] = useState({
    email: null,
    nickname: null,
    phone: null,
    ssn: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // 비밀번호 확인 (입력할 때마다 자동 검사)
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setErrorMessage("");
    }
  }, [password, confirmPassword]);

  // 중복 확인 요청 (공통 함수)
  const handleCheckDuplicate = async (field) => {
    const value = userData[field];

    if (!value) {
      setErrorMessage(
        `${
          field === "email"
            ? "이메일"
            : field === "nickname"
            ? "닉네임"
            : field === "phone"
            ? "전화번호"
            : "주민등록번호"
        }을 입력하세요.`
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8050/user/check-duplicate?type=${field}&value=${value}`
      );
      const data = await response.json();

      if (response.ok) {
        setCheckResult((prev) => ({ ...prev, [field]: data.isDuplicate }));
        setErrorMessage(
          data.isDuplicate ? "이미 사용 중입니다." : "사용 가능합니다."
        );
      } else {
        setErrorMessage("중복 확인 실패. 다시 시도하세요.");
      }
    } catch (error) {
      console.error("중복 확인 오류:", error);
      setErrorMessage("서버 오류 발생.");
    }
  };

  // 회원가입 처리
  const handleRegister = async (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    // 비밀번호 확인
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
          email: userData.email,
          password,
          name,
          nickname: userData.nickname,
          ssn: userData.ssn,
          phone: userData.phone,
          address,
          reference: reference || null,
          marketingOptIn: marketingOptIn ? 1 : 0,
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
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            autoComplete="email"
          />
          <button type="button" onClick={() => handleCheckDuplicate("email")}>
            중복 확인
          </button>
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
            setErrorMessage("");
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
            placeholder="주민등록번호"
            value={userData.ssn}
            onChange={(e) => setUserData({ ...userData, ssn: e.target.value })}
          />
          <button type="button" onClick={() => handleCheckDuplicate("ssn")}>
            중복 확인
          </button>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="닉네임"
            value={userData.nickname}
            onChange={(e) =>
              setUserData({ ...userData, nickname: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => handleCheckDuplicate("nickname")}
          >
            중복 확인
          </button>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="전화번호"
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
          />
          <button type="button" onClick={() => handleCheckDuplicate("phone")}>
            중복 확인
          </button>
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
