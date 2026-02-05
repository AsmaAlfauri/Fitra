const Sidebar = () => {
  return (
      <aside className="w-64 bg-white shadow-md p-5">
        <h1 className="text-xl font-bold mb-6">Fitra Dashboard</h1>
        <nav className="flex flex-col gap-3">
          <button className="text-left hover:bg-gray-200 p-2 rounded">Overview</button>
          <button className="text-left hover:bg-gray-200 p-2 rounded">Users</button>
          <button className="text-left hover:bg-gray-200 p-2 rounded">Campaigns</button>
          <button className="text-left hover:bg-gray-200 p-2 rounded">Donations</button>
        </nav>
      </aside>
  );
};

export default Sidebar;