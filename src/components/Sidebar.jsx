import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
    { name: "Users", path: "/users" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="bg-white shadow-lg w-64 min-h-screen p-4 fixed">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
      <ul className="space-y-4">
        {menu.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`block p-2 rounded ${
                location.pathname === item.path
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
