export default function UserList({ users, onEdit, onDelete }) {
  const handleDelete = (id) => {
    if (!window.confirm("Удалить пользователя?")) return;

    fetch(`http://127.0.0.1:8000/users/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) onDelete(id);
      else alert("Ошибка удаления");
    });
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr style={headerRowStyle}>
          <th style={thStyle}>ID</th>
          <th style={thStyle}>Username</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Full Name</th>
          <th style={thStyle}>Действия</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} style={rowStyle} className="user-row">
            <td style={tdStyle}>{user.id}</td>
            <td style={tdStyle}>{user.username}</td>
            <td style={tdStyle}>{user.email}</td>
            <td style={tdStyle}>{user.fullname}</td>
            <td style={tdStyle}>
              <button onClick={() => onEdit(user)} style={editBtnStyle}>
                Редактировать
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                style={deleteBtnStyle}
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <style>{`
        .user-row:hover {
          background-color: #2a2a2a;
        }
      `}</style>
    </table>
  );
}

const tableStyle = {
  borderCollapse: "collapse",
  width: "100%",
  backgroundColor: "#121212",
  color: "#e0e0e0",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
};

const headerRowStyle = {
  backgroundColor: "#1f1f1f",
  borderBottom: "2px solid #444",
};

const thStyle = {
  padding: "12px 15px",
  textAlign: "left",
  borderBottom: "1px solid #333",
  fontWeight: "600",
  fontSize: "14px",
  userSelect: "none",
};

const rowStyle = {
  borderBottom: "1px solid #333",
  transition: "background-color 0.3s ease",
};

const tdStyle = {
  padding: "12px 15px",
  fontSize: "13px",
};

const buttonBase = {
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background-color 0.25s ease",
};

const editBtnStyle = {
  ...buttonBase,
  backgroundColor: "#388e3c",
  color: "#e0e0e0",
  marginRight: "8px",
};
const deleteBtnStyle = {
  ...buttonBase,
  backgroundColor: "#d32f2f",
  color: "#e0e0e0",
};

