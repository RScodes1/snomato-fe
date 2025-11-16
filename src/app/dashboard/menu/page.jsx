"use client";

import { useEffect, useState } from "react";
import instance from "../../../lib/api";

export default function MenuPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", category: "" });

  async function fetchItems() {
    const res = await instance.get("/menu");
    setItems(res.data);
  }

  async function addItem(e) {
    e.preventDefault();
    await instance.post("/menu", form);
    setForm({ name: "", price: "", category: "" });
    fetchItems();
  }

  async function deleteItem(id) {
    await instance.delete(`/menu/${id}`);
    fetchItems();
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Menu</h1>

      {/* ADD ITEM */}
      <form
        onSubmit={addItem}
        className="bg-white shadow p-6 rounded-xl flex gap-4 mb-8"
      >
        <input
          required
          placeholder="Item Name"
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          required
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          required
          placeholder="Category"
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <button className="bg-orange-600 text-white px-4 rounded">Add</button>
      </form>

      {/* LIST ITEMS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-xl shadow flex justify-between">
            <div>
              <p className="font-semibold text-lg">{item.name}</p>
              <p className="text-gray-600">₹{item.price}</p>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>
            <button
              onClick={() => deleteItem(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
