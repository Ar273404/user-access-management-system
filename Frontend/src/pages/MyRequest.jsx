import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Api } from "../Api.jsx";

const MyRequests = () => {
  const { token } = useContext(AuthContext);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyRequests = async () => {
    try {
      const res = await fetch(`${Api}/api/requests/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to fetch requests");
      }

      const data = await res.json();
      setMyRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  // ✅ Count request stats
  const total = myRequests.length;
  const approved = myRequests.filter((r) => r.status === "Approved").length;
  const rejected = myRequests.filter((r) => r.status === "Rejected").length;
  const pending = myRequests.filter((r) => r.status === "Pending").length;

  return (
    <div className="max-w-6xl mx-auto mt-16 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        My Software Access Requests
      </h1>

      {loading && <p className="text-blue-600 text-center">Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && total === 0 ? (
        <p className="text-gray-600 text-center">No requests found.</p>
      ) : (
        <>
          {/* ✅ Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 text-center">
            <div className="bg-blue-100 text-blue-800 rounded p-4 shadow">
              <p className="text-sm font-semibold">Total</p>
              <p className="text-xl font-bold">{total}</p>
            </div>
            <div className="bg-green-100 text-green-800 rounded p-4 shadow">
              <p className="text-sm font-semibold">Approved</p>
              <p className="text-xl font-bold">{approved}</p>
            </div>
            <div className="bg-yellow-100 text-yellow-800 rounded p-4 shadow">
              <p className="text-sm font-semibold">Pending</p>
              <p className="text-xl font-bold">{pending}</p>
            </div>
            <div className="bg-red-100 text-red-800 rounded p-4 shadow">
              <p className="text-sm font-semibold">Rejected</p>
              <p className="text-xl font-bold">{rejected}</p>
            </div>
          </div>

          {/* ✅ Request Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border rounded-lg shadow-sm">
              <thead className="bg-indigo-100 text-indigo-800 text-sm uppercase font-semibold">
                <tr>
                  <th className="px-6 py-3 border">#</th>
                  <th className="px-6 py-3 border text-left">Software</th>
                  <th className="px-6 py-3 border text-left">Access Type</th>
                  <th className="px-6 py-3 border text-left">Reason</th>
                  <th className="px-6 py-3 border text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {myRequests.map((r, index) => (
                  <tr
                    key={r.id}
                    className="text-sm text-gray-700 even:bg-gray-50">
                    <td className="px-6 py-3 border text-center">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3 border">{r.software.name}</td>
                    <td className="px-6 py-3 border">{r.accessType}</td>
                    <td className="px-6 py-3 border">{r.reason}</td>
                    <td className="px-6 py-3 border">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            r.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : r.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyRequests;
