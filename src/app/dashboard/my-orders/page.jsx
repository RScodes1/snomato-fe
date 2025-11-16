"use client";

import { useEffect, useState } from "react";
import instance from "../../../lib/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  async function loadOrders() {
    const res = await instance.get("/orders/my");
    setOrders(res.data);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o._id} className="p-5 bg-white rounded-xl shadow">
            <p className="font-semibold">Order #{o._id}</p>
            <p className="text-gray-600">Items: {o.items.length}</p>
            <p className="text-gray-600 font-medium">Status: {o.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
