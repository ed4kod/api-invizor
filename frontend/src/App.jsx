import {useEffect, useState} from "react";
import UserCreate from "./components/UserCreate";
import UserEdit from "./components/UserEdit";
import UserList from "./components/UserList";

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null); // юзер для редактирования

    const fetchUsers = () => {
        setLoading(true);
        setError(null);
        fetch("http://127.0.0.1:8000/users/")
            .then((res) => {
                if (!res.ok) throw new Error("Не удалось загрузить пользователей");
                return res.json();
            })
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((e) => {
                setError(e.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserCreated = (newUser) => {
        setUsers((prev) => [...prev, newUser]);
    };

    const handleUserUpdated = (updatedUser) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
        setEditingUser(null);
    };

    const handleUserDeleted = (userId) => {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div>
            <h1>Пользователи</h1>

            {editingUser ? (
                <UserEdit
                    user={editingUser}
                    onCancel={() => setEditingUser(null)}
                    onUpdated={handleUserUpdated}
                />
            ) : (
                <UserCreate onCreated={handleUserCreated}/>
            )}

            <UserList
                users={users}
                onEdit={(user) => setEditingUser(user)}
                onDelete={handleUserDeleted}
            />
        </div>
    );
}

export default App;
