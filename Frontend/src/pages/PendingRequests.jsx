import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Api } from "../Api.jsx";

const PendingRequests = () => {
  const { token } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`${Api}/api/requests/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch pending requests");
      }
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id, status) => {
    if (
      !window.confirm(
        `Are you sure you want to ${status.toLowerCase()} this request?`
      )
    ) {
      return;
    }
    setProcessingId(id);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(`${Api}/api/requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || `Failed to update request`);
      }
      setMessage(`Request ${status.toLowerCase()} successfully.`);
      // Refresh list to update UI
      await fetchPendingRequests();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-16 px-6 py-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Pending Access Requests
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-6 rounded">{error}</div>
      )}

      {message && (
        <div className="bg-green-100 text-green-700 p-3 mb-6 rounded">
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-center text-lg">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-600">No pending requests</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">User</th>
                <th className="border px-4 py-2 text-left">Software</th>
                <th className="border px-4 py-2 text-left">Access Type</th>
                <th className="border px-4 py-2 text-left">Reason</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="odd:bg-white even:bg-gray-50">
                  <td className="border px-4 py-2">
                    {req.user?.username || "Unknown"}
                  </td>
                  <td className="border px-4 py-2">
                    {req.software?.name || "Unknown"}
                  </td>
                  <td className="border px-4 py-2">{req.accessType}</td>
                  <td className="border px-4 py-2">{req.reason}</td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <button
                      disabled={processingId === req.id}
                      onClick={() => updateRequestStatus(req.id, "Approved")}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm disabled:opacity-50">
                      Approve
                    </button>
                    <button
                      disabled={processingId === req.id}
                      onClick={() => updateRequestStatus(req.id, "Rejected")}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm disabled:opacity-50">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
