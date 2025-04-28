import { useEffect, useState } from "react";
import api from "../api/api";
import Loader from "../components/Loader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/allBlogForAdmin"); 
      setUsers(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users (Blog Admins)</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4">Title</th>
              <th className="text-left py-3 px-4">Description</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="py-3 px-4">{user.title}</td>
                  <td className="py-3 px-4">{user.description}</td>
                </tr>
              ))
            ) : (
              <tr><td className="py-4 px-6 text-center" colSpan="2">No Users Found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
