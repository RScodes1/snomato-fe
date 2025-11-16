"use client";

import { useEffect, useState } from "react";
import instance from "../../lib/api";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [roles, setRoles] = useState({}); // Store selected role per user

  async function fetchRequests() {
    try {
      const res = await instance.get("api/auth/pending-users");
      setRequests(res.data.pending);
    } catch (err) {
      router.push("/dashboard");
    }
  }

  async function approveUser(id) {
    const role = roles[id];
    if (!role) {
      alert("Please select a role");
      return;
    }

    await instance.post(`api/auth/create-user/${id}`, { role });
    fetchRequests();
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Pending User Approvals</h1>

      {requests.length === 0 && <p>No pending requests.</p>}

      <div className="space-y-4">
        {requests?.map((u) => (
          <div key={u._id} className="p-4 bg-white rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{u.username}</p>
              <p className="text-gray-600">{u.email}</p>
            </div>

            {/* Role Selector */}
            <select
              className="border p-2 rounded-lg"
              onChange={(e) => setRoles({ ...roles, [u._id]: e.target.value })}
              defaultValue=""
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Manager">Manager</option>
              <option value="Member">Team Member</option>
            </select>
            <button
              onClick={() => approveUser(u._id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
