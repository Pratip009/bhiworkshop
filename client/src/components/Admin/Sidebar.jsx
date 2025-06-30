/* eslint-disable react/prop-types */
const Sidebar = ({ active, setActive }) => {
  const menuItems = ["Users", "Add Courses", "Payments"];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item}>
            <button
              className={`w-full text-left px-4 py-2 rounded-md ${
                active === item ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => setActive(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
