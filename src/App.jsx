import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-4 overflow-auto ml-64">
          <Navbar />
          <div className="p-6">
            <AppRoutes />
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
