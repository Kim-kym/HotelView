import { useState, useEffect } from "react";
import "../../styled/Admin.css";

function Admin() {
  // ✅ 백엔드에서 데이터 불러올 때 사용하는 상태
  const [users, setUsers] = useState([]);
  const [givePoints, setGivePoints] = useState({});
  const [deductPoints, setDeductPoints] = useState({});
  const [selectedRanks, setSelectedRanks] = useState({});

  // ✅ 회원 등급 옵션 리스트
  const rankList = ["일반", "실버", "VIP", "VVIP"];

  // ✅ 백엔드에서 데이터 불러오기
  useEffect(() => {
    fetch("http://localhost:8050/admin/users", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("회원 목록 불러오기 실패:", err));
  }, []);

  // ✅ 회원 등급 변경 시 상태 업데이트
  const handleRankChange = (id, newRank) => {
    setSelectedRanks((prev) => ({
      ...prev,
      [id]: newRank,
    }));
  };

  // ✅ 회원 등급 업데이트 (백엔드 연동)
  const updateRole = (id) => {
    const newRank = selectedRanks[id] || users.find((user) => user.id === id).rank;

    fetch(`http://localhost:8050/admin/users/${id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ role: newRank }),
    })
      .then(() => {
        alert(`회원 등급이 ${newRank}로 변경되었습니다!`);
        setUsers(users.map((user) => (user.id === id ? { ...user, rank: newRank } : user)));
      })
      .catch((err) => console.error("등급 변경 실패:", err));
  };

  // ✅ 지급 입력값 변경 핸들러
  const handleGivePointChange = (id, value) => {
    setGivePoints((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // ✅ 차감 입력값 변경 핸들러
  const handleDeductPointChange = (id, value) => {
    setDeductPoints((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // ✅ 포인트 지급/차감 (백엔드 연동)
  const updatePoints = (id, amount) => {
    if (!amount || isNaN(amount)) {
      alert("올바른 숫자를 입력하세요!");
      return;
    }

    fetch(`http://localhost:8050/admin/users/${id}/points`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ points: Number(amount) }),
    })
      .then(() => {
        alert(`${amount} 포인트가 적용되었습니다!`);
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, points: user.points + Number(amount) } : user
          )
        );
        setGivePoints((prev) => ({ ...prev, [id]: "" }));
        setDeductPoints((prev) => ({ ...prev, [id]: "" }));
      })
      .catch((err) => console.error("포인트 변경 실패:", err));
  };

  return (
    <div className="admin-container">
      <h2>회원 관리</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>회원 번호</th>
            <th>이름</th>
            <th>이메일</th>
            <th>현재 등급</th>
            <th>포인트</th>
            <th>포인트 조정</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  className="rank-select"
                  value={selectedRanks[user.id] || user.rank}
                  onChange={(e) => handleRankChange(user.id, e.target.value)}
                >
                  {rankList.map((rank, i) => (
                    <option key={i} value={rank}>
                      {rank}
                    </option>
                  ))}
                </select>
                <button className="update-rank-btn" onClick={() => updateRole(user.id)}>
                  변경
                </button>
              </td>
              <td>{user.points} P</td>
              <td className="point-controls">
                <div className="point-control">
                  <input
                    type="number"
                    className="point-input"
                    value={givePoints[user.id] || ""}
                    onChange={(e) => handleGivePointChange(user.id, e.target.value)}
                    placeholder="지급"
                  />
                  <button
                    className="give-points"
                    onClick={() => updatePoints(user.id, Number(givePoints[user.id]))}
                  >
                    지급
                  </button>
                </div>

                <div className="point-control">
                  <input
                    type="number"
                    className="point-input"
                    value={deductPoints[user.id] || ""}
                    onChange={(e) => handleDeductPointChange(user.id, e.target.value)}
                    placeholder="차감"
                  />
                  <button
                    className="deduct-points"
                    onClick={() => updatePoints(user.id, -Number(deductPoints[user.id]))}
                  >
                    차감
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
