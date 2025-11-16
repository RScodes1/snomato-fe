"use client";

import { useEffect, useState } from "react";
import instance from "../../../lib/api";

export default function PlaceOrder() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  async function loadMenu() {
    const res = await instance.get("/menu");
    setItems(res.data);
  }

  function addToCart(item) {
    setCart([...cart, item]);
  }

  async function checkout() {
    const item_ids = cart.map((i) => i._id);
    await instance.post("/orders", { items: item_ids });
    alert("Order placed!");
    setCart([]);
  }

  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Place Order</h1>

      <h2 className="text-xl font-semibold mb-3">Menu Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {items.map((i) => (
          <div key={i._id} className="p-4 bg-white rounded-xl shadow flex justify-between">
            <div>
              <p className="font-semibold">{i.name}</p>
              <p className="text-gray-600">₹{i.price}</p>
            </div>
            <button
              onClick={() => addToCart(i)}
              className="bg-orange-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3">Cart</h2>

      {cart.length === 0 && <p className="text-gray-600">Cart is empty.</p>}

      {cart.length !== 0 && (
        <div>
          <ul className="space-y-2 mb-4">
            {cart.map((c, idx) => (
              <li key={idx} className="bg-white p-3 rounded shadow">
                {c.name} — ₹{c.price}
              </li>
            ))}
          </ul>

          <button
            onClick={checkout}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
