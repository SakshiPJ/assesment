const Dashboard = () => {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-white rounded shadow">Total Products</div>
          <div className="p-4 bg-white rounded shadow">Total Orders</div>
          <div className="p-4 bg-white rounded shadow">Total Users</div>
          <div className="p-4 bg-white rounded shadow">Settings Info</div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  