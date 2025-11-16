"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import instance from "../lib/api";

export default function RequestAccessPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await instance.post("api/auth/request-access", {
        username,
        email,
      });

      setMsg(res.data.msg);
      setErr("");
    } catch (error) {
      setErr(error.response?.data?.msg || "Error submitting request");
      setMsg("");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-red-100 to-orange-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-4">Request Access</h1>

        {msg && <p className="text-green-600 mb-4 text-center">{msg}</p>}
        {err && <p className="text-red-600 mb-4 text-center">{err}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full mb-4 p-3 border rounded-lg"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-6 p-3 border rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
