import { useState, useEffect } from "react";
import "../../styled/Admin.css";

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8020/admin/users", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("회원 목록 불러오기 실패:", err));
  }, []);

  // 회원 등급 변경 (순환 방식: 일반 → 실버 → VIP → VVIP → 일반)
  const rankList = ["일반", "실버", "VIP", "VVIP"];

  const updateRole = (id, currentRank) => {
    const newRank =
      rankList[(rankList.indexOf(currentRank) + 1) % rankList.length]; // 다음 등급 설정

    fetch(`http://localhost:8020/admin/users/${id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ role: newRank }),
    })
      .then(() => {
        alert(`등급이 ${newRank}로 변경되었습니다!`);
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, role: newRank } : user
          )
        ); // UI 업데이트
      })
      .catch((err) => console.error("등급 변경 실패:", err));
  };

  // 포인트 지급/회수 기능
  const updatePoints = (id, amount) => {
    fetch(`http://localhost:8020/admin/users/${id}/points`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ points: amount }),
    })
      .then(() => {
        alert(`${amount}포인트가 적용되었습니다!`);
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, points: user.points + amount } : user
          )
        ); // UI 업데이트
      })
      .catch((err) => console.error("포인트 변경 실패:", err));
  };

  return (
    <div className="admin-container">
      <h2>회원 관리</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>회원 번호</th>
            <th>이름</th>
            <th>이메일</th>
            <th>현재 등급</th>
            <th>등급 변경</th>
            <th>포인트</th>
            <th>포인트 조정</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => updateRole(user.id, user.role)}>
                  등급 변경
                </button>
              </td>
              <td>{user.points} P</td>
              <td>
                <button onClick={() => updatePoints(user.id, 1000)}>
                  +1000P
                </button>
                <button onClick={() => updatePoints(user.id, -1000)}>
                  -1000P
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
