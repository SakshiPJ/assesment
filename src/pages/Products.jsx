import { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import ConfirmModal from "../components/ConfirmModal";

const Products = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // Fetch all articles
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/Article/getArticle");
      setArticles(res.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create new article
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/Article/createArticle", form);
      toast.success("Article Created!");
      setForm({ title: "", description: "" });
      fetchArticles();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create article");
    }
  };

  // Prepare to delete
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  // Confirm delete
  const handleDelete = async () => {
    try {
      await api.delete(`/admin/Article/deleteArticle/${selectedId}`);
      toast.success("Article Deleted!");
      fetchArticles();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete article");
    } finally {
      setOpenModal(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products (Articles)</h1>

      {/* Create New Article Form */}
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Product
        </button>
      </form>

      {/* Articles List */}
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
            {articles.length > 0 ? (
              articles.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="py-3 px-4">{item.title}</td>
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4 space-x-2">
                    {/* Update/Delete actions */}
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
              <tr><td className="py-4 px-6 text-center" colSpan="3">No Articles Found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm Delete Modal */}
      {openModal && (
        <ConfirmModal
          title="Delete Article"
          message="Are you sure you want to delete this article?"
          onConfirm={handleDelete}
          onCancel={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default Products;
