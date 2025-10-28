import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/sharedTheme";

export const LoginPage: React.FC = () => {
const { login } = useAuth();
const { theme } = useTheme();
const navigate = useNavigate();
const location = useLocation();
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [err, setErr] = useState<string | null>(null);
const from = (location.state as { from: { pathname: string } })?.from?.pathname || "/dashboard";

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setErr(null);
try {
await login(username, password);
navigate(from, { replace: true });
} catch (error: unknown) {
if (error instanceof Error) {
setErr(error.message);
} else {
setErr("Login failed");
}
}
};

const bgClass =
theme === "dark"
? "bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100"
: "bg-gradient-to-b from-amber-50 via-orange-50 to-white text-gray-800";

const cardClass =
theme === "dark"
? "bg-gray-900/70 backdrop-blur border border-blue-600/40 shadow-[0_0_15px_rgba(0,0,255,0.3)]"
: "bg-white/70 backdrop-blur border border-amber-200 shadow-lg";

const inputClass =
theme === "dark"
? "w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
: "w-full p-2 rounded bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-amber-400 outline-none transition";

const btnClass =
theme === "dark"
? "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition shadow-[0_0_8px_rgba(0,0,255,0.4)]"
: "px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded transition shadow-md";

return (
<div className={`min-h-screen flex items-center justify-center ${bgClass} transition-colors`}>
<div className={`p-8 rounded-xl max-w-md w-full ${cardClass} transition-all`}>
<h3 className="text-2xl mb-6 text-center font-semibold">Login (Simulasi)</h3>
<form onSubmit={handleSubmit} className="space-y-4">
<input
value={username}
onChange={(e) => setUsername(e.target.value)}
placeholder="Username"
className={inputClass}
/>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="Password"
className={inputClass}
/>
{err && <div className="text-red-500 text-sm">{err}</div>}
<div className="flex justify-center">
<button className={btnClass} type="submit">
Login
</button>
</div>
</form>
</div>
</div>
);
};