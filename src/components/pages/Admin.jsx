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

  const updateRole = (id, newRole) => {
    fetch(`http://localhost:8020/admin/users/${id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ role: newRole }),
    })
      .then(() => {
        alert("등급 변경 완료");
        window.location.reload();
      })
      .catch((err) => console.error("등급 변경 실패:", err));
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
                {user.role === "admin" ? (
                  <button onClick={() => updateRole(user.id, "user")}>
                    일반회원으로 변경
                  </button>
                ) : (
                  <button onClick={() => updateRole(user.id, "admin")}>
                    관리자로 변경
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
