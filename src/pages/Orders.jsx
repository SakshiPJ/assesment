import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import ConfirmModal from "../components/ConfirmModal";

const Orders = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/Career/allCareer");
      setCareers(res.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch careers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      // Not attaching image for now (optional)

      await api.post("/admin/Career/addCareer", fd);
      toast.success("Career Created!");
      setForm({ title: "", description: "" });
      fetchCareers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create career");
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/Career/deleteCareer/${selectedId}`);
      toast.success("Career Deleted!");
      fetchCareers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete career");
    } finally {
      setOpenModal(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders (Careers)</h1>

      {/* Create New Career */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Order
        </button>
      </form>

      {/* Careers List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4">Title</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.length > 0 ? (
              careers.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="py-3 px-4">{item.title}</td>
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td className="py-4 px-6 text-center" colSpan="3">No Orders Found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm Delete Modal */}
      {openModal && (
        <ConfirmModal
          title="Delete Order"
          message="Are you sure you want to delete this order?"
          onConfirm={handleDelete}
          onCancel={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default Orders;
