import { useState } from "react";

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    // Zmiana nazwy funkcji na np. handleLogin
    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ login: login, password: password }),
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "/edit";
            } else {
                alert("Wrong login or password");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <div className="login-form">
                <input className="login-input"
                    type="text"
                    placeholder="Login"
                    value={login} // Dodanie wartości, aby formularz był kontrolowany
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password} // Dodanie wartości, aby formularz był kontrolowany
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}
