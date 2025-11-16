"use client";
import { useState } from "react";
import instance from "../../lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await instance.post("api/auth/login", { email, password });
       document.cookie = `token=${res.data.token}; path=/;`;
         router.push("dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-100 to-red-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-4">Welcome to Somato 🍽️</h1>
        <p className="text-center text-gray-600 mb-4">
          If you don’t have an account, please{" "}
          <Link className="text-orange-600 underline" href="/request-access">
            request access from admin
          </Link>.
        </p>

        {error && <p className="text-red-600 mb-3 text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 border rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 border rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
