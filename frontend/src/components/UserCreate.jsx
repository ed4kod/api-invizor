import {useState} from "react";

export default function UserCreate({onCreated}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        fetch("http://127.0.0.1:8000/users/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, email, password, fullname}),
        })
            .then(async (res) => {
                if (!res.ok) {
                    let errorMessage = "Ошибка при создании пользователя";
                    try {
                        const data = await res.json();
                        errorMessage = data.detail || errorMessage;
                    } catch {
                    }
                    throw new Error(errorMessage);
                }
                return res.json();
            })
            .then((newUser) => {
                setUsername("");
                setEmail("");
                setPassword("");
                setFullname("");
                onCreated(newUser);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    };

    return (
        <form onSubmit={handleSubmit} style={{marginBottom: "1rem"}}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{marginRight: "0.5rem"}}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{marginRight: "0.5rem"}}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{marginRight: "0.5rem"}}
            />
            <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
                style={{marginRight: "0.5rem"}}
            />
            <button type="submit" disabled={loading}>
                {loading ? "Создаем..." : "Создать пользователя"}
            </button>

            {error && <p style={{color: "red"}}>Ошибка: {error}</p>}
        </form>
    );
}
