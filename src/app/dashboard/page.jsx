"use client";

import { useEffect, useState } from "react";
import instance from "../lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const res = await instance.get("/api/auth/me"); // You need to create this API
      console.log({res});
       const { userData } = res.data;
  // Redirect based on role
    if (userData.role === "Admin") {
      router.push("dashboard/admin");
    } else {
      router.push("dashboard");
    }
      setUser(res.data.userData);
    } catch (err) {
      router.push("/login");
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  const isAdmin = user.role === "Admin";
  const isManager = user.role === "Manager";

  return (
    <div className="min-h-screen p-8 bg-orange-50">
      <h1 className="text-3xl font-bold mb-3">Welcome, {user.username} 👋</h1>
      <p className="text-gray-600 mb-8">Role: {user.role}</p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {/* Admin: Approve Users */}
        {isAdmin && (
          <Card title="Approve Users" onClick={() => router.push("/dashboard/admin")} />
        )}

        {/* Manager + Admin: Menu management */}
        {(isAdmin || isManager) && (
          <Card title="Manage Menu" onClick={() => router.push("/dashboard/menu")} />
        )}

        {/* Manager + Admin: All orders */}
        {(isAdmin || isManager) && (
          <Card title="Orders" onClick={() => router.push("/dashboard/orders")} />
        )}

        {/* Member: Place order */}
        {user.role === "Member" && (
          <Card title="Place Order" onClick={() => router.push("/dashboard/place-order")} />
        )}

        {/* Member: My Orders */}
        {user.role === "Member" && (
          <Card title="My Orders" onClick={() => router.push("/dashboard/my-orders")} />
        )}
      </div>
       <button>Logout</button>
    </div>
  );
}

function Card({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition"
    >
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
}
