import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styled/EditProfile.css"; // ✅ 스타일 파일 연결

const EditProfile = () => {
  const navigate = useNavigate();

  // ✅ 사용자 정보 상태 관리
  const [formData, setFormData] = useState({
    nickname: "사용자닉네임", // 백엔드에서 불러올 데이터
    email: "user@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ✅ 입력값 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ 저장 버튼 클릭 시
  const handleSave = async () => {
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      /* 🔹 백엔드 API 연동 (주석 처리된 부분)
      const response = await fetch("http://localhost:8050/user/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("정보가 수정되었습니다!");
        navigate("/mypage"); // ✅ 마이페이지로 이동
      } else {
        alert("수정에 실패했습니다.");
      }
      */

      // ✅ 더미 데이터로 확인 (백엔드 연결 전)
      console.log("정보 수정:", formData);
      alert("정보가 수정되었습니다! (테스트)");
      navigate("/mypage"); // ✅ 마이페이지로 이동
    } catch (error) {
      console.error("오류 발생:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>정보 수정</h2>
      <div className="form-group">
        <label>닉네임</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>이메일</label>
        <input type="email" name="email" value={formData.email} disabled />
      </div>
      <div className="form-group">
        <label>현재 비밀번호</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>새 비밀번호</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>새 비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="button-group">
        <button className="cancel-button" onClick={() => navigate("/mypage")}>
          취소
        </button>
        <button className="save-button" onClick={handleSave}>
          저장
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
