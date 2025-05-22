import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Api } from "../Api.jsx";

const RequestAccess = () => {
  const { token } = useContext(AuthContext);

  const [softwares, setSoftwares] = useState([]);
  const [loadingSoftwares, setLoadingSoftwares] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    softwareId: "",
    accessType: "",
    reason: "",
  });

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  // Fetch available software on mount
  useEffect(() => {
    fetchSoftwares();
  }, []);

  const fetchSoftwares = async () => {
    setLoadingSoftwares(true);
    setError(null);
    try {
      const res = await fetch(`${Api}/api/software/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch software list");
      }
      const data = await res.json();
      setSoftwares(data);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoadingSoftwares(false);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSubmitSuccess(null);
  };

  // Get access levels of selected software
  const currentAccessLevels =
    softwares.find((s) => s.id === Number(form.softwareId))?.accessLevels || [];

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.softwareId || !form.accessType || !form.reason.trim()) {
      setError("Please fill all fields");
      setSubmitSuccess(null);
      return;
    }

    setLoadingSubmit(true);
    setError(null);
    setSubmitSuccess(null);

    try {
      const res = await fetch(
        `${Api}/api/requests/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            softwareId: Number(form.softwareId),
            accessType: form.accessType,
            reason: form.reason.trim(),
          }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to submit request");
      }
      setSubmitSuccess("Access request submitted successfully.");
      setForm({
        softwareId: "",
        accessType: "",
        reason: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Request Software Access
      </h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {submitSuccess && (
        <p className="text-green-600 text-center mb-4">{submitSuccess}</p>
      )}

      <form onSubmit={onSubmit} noValidate>
        <label htmlFor="softwareId" className="block font-medium mb-1">
          Software
        </label>
        {console.log(softwares)}
        {loadingSoftwares ? (
          <p>Loading software list...</p>
        ) : (
          <select
            id="softwareId"
            name="softwareId"
            value={form.softwareId}
            onChange={onChange}
            className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required>
            <option value="">Select software</option>
            {softwares.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        )}

        <label htmlFor="accessType" className="block font-medium mb-1">
          Access Type
        </label>
        <select
          id="accessType"
          name="accessType"
          value={form.accessType}
          onChange={onChange}
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={!form.softwareId}>
          <option value="">Select access type</option>
          {currentAccessLevels}
          {currentAccessLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <label htmlFor="reason" className="block font-medium mb-1">
          Reason
        </label>
        <textarea
          id="reason"
          name="reason"
          rows={4}
          value={form.reason}
          onChange={onChange}
          placeholder="Explain why you need this access"
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loadingSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition font-semibold disabled:opacity-50">
          {loadingSubmit ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default RequestAccess;
