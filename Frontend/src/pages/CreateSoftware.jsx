import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const accessLevelOptions = ["Read", "Write", "Admin"];

const CreateSoftware = () => {
  const { token } = useContext(AuthContext);
  const [softwares, setSoftwares] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    accessLevels: [],
  });

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    accessLevels: [],
  });

  const apiUrl = "http://localhost:5000/api/software";

  // Fetch all software on mount
  useEffect(() => {
    fetchSoftwares();
  }, []);

  const fetchSoftwares = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl, {
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
      setLoading(false);
    }
  };

  // Handle create new software
  const handleCreate = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      form.accessLevels.length === 0
    ) {
      setError("All fields are required with at least one access level");
      return;
    }

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create software");
      }
      const newSoftware = await res.json();
      setSoftwares((prev) => [...prev, newSoftware]);
      setForm({ name: "", description: "", accessLevels: [] });
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle edit click
  const handleEditClick = (software) => {
    setEditId(software.id);
    setEditForm({
      name: software.name,
      description: software.description,
      accessLevels: software.accessLevels,
    });
  };

  // Handle input changes in edit form
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "accessLevels") {
      let levels = editForm.accessLevels.slice();
      if (checked) {
        levels.push(value);
      } else {
        levels = levels.filter((l) => l !== value);
      }
      setEditForm({ ...editForm, accessLevels: levels });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  // Save edited software
  const handleEditSave = async (id) => {
    if (
      !editForm.name.trim() ||
      !editForm.description.trim() ||
      editForm.accessLevels.length === 0
    ) {
      setError("All fields are required with at least one access level");
      return;
    }
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update software");
      }
      const updated = await res.json();
      setSoftwares((prev) => prev.map((s) => (s.id === id ? updated : s)));
      setEditId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Cancel edit
  const handleEditCancel = () => {
    setEditId(null);
    setError(null);
  };

  // Delete software
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this software?"))
      return;

    setError(null);
    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete software");
      }

      // ✅ Remove deleted software from local state
      setSoftwares((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(err.message);
      console.error("Delete software error:", err);
    }
  };
  

  // Handle create form input changes
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "accessLevels") {
      let levels = form.accessLevels.slice();
      if (checked) {
        levels.push(value);
      } else {
        levels = levels.filter((l) => l !== value);
      }
      setForm({ ...form, accessLevels: levels });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 px-6 py-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Software Management
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 mb-6 p-3 rounded">{error}</div>
      )}

      <form
        onSubmit={handleCreate}
        className="mb-8 space-y-4 max-w-md mx-auto border p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Software</h2>

        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Software name"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleFormChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Describe the software"
            rows={3}
            required
          />
        </div>

        <div>
          <span className="block font-semibold mb-1">Access Levels</span>
          <div className="flex space-x-4">
            {accessLevelOptions.map((level) => (
              <label
                key={level}
                className="inline-flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="accessLevels"
                  value={level}
                  checked={form.accessLevels.includes(level)}
                  onChange={handleFormChange}
                />
                <span>{level}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition font-semibold">
          Create Software
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4 text-center">
        Existing Software
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Description</th>
                <th className="border p-3 text-left">Access Levels</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {softwares.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No software created yet.
                  </td>
                </tr>
              )}

              {softwares.map((s) => (
                <tr key={s.id} className="odd:bg-white even:bg-gray-50">
                  <td className="border p-3">
                    {editId === s.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="w-full border rounded px-2 py-1"
                      />
                    ) : (
                      s.name
                    )}
                  </td>
                  <td className="border p-3">
                    {editId === s.id ? (
                      <textarea
                        name="description"
                        value={editForm.description}
                        onChange={handleEditChange}
                        rows={2}
                        className="w-full border rounded px-2 py-1"
                      />
                    ) : (
                      s.description
                    )}
                  </td>
                  <td className="border p-3">
                    {editId === s.id ? (
                      <div className="flex space-x-4">
                        {accessLevelOptions.map((level) => (
                          <label
                            key={level}
                            className="inline-flex items-center space-x-1 cursor-pointer">
                            <input
                              type="checkbox"
                              name="accessLevels"
                              value={level}
                              checked={editForm.accessLevels.includes(level)}
                              onChange={handleEditChange}
                            />
                            <span className="text-sm">{level}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      s.accessLevels.join(", ")
                    )}
                  </td>

                  <td className="border p-3 text-center space-x-2">
                    {editId === s.id ? (
                      <>
                        <button
                          onClick={() => handleEditSave(s.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm">
                          Save
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="bg-gray-400 px-3 py-1 rounded hover:bg-gray-500 transition text-sm">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(s)}
                          className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 transition text-sm">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm">
                          Delete
                        </button>
                      </>
                    )}
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

export default CreateSoftware;
