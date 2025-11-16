"use client";

import { useEffect, useState } from "react";
import instance from "../../../lib/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    const res = await instance.get("/orders");
    setOrders(res.data);
  }

  async function updateStatus(id, status) {
    await instance.put(`/orders/${id}`, { status });
    fetchOrders();
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-5">All Orders</h1>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o._id} className="p-5 bg-white rounded-xl shadow">
            <p className="font-semibold">Order #{o._id}</p>
            <p className="text-gray-600">User: {o.user?.username}</p>
            <p className="text-gray-600">Items: {o.items.length}</p>
            <p className="font-medium mt-1">Status: {o.status}</p>

            <div className="mt-3 flex gap-3">
              <button
                onClick={() => updateStatus(o._id, "Delivered")}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Delivered
              </button>
              <button
                onClick={() => updateStatus(o._id, "Cancelled")}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
