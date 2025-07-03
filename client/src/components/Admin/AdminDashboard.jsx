import { useState } from "react";
import Sidebar from "./Sidebar";
import Users from "./Users";
import AddCourse from "./AddCourse";

import Payment from "./Payment";
import UserMessages from "./UserMessages";

const AdminDashboard = () => {
  const [active, setActive] = useState("Users");

  return (
    <div className="flex h-screen">
      <Sidebar active={active} setActive={setActive} />
      <div
        className="flex-1 p-6 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 60px)" }}
      >
        {active === "Users" && <Users />}
        {active === "Add Courses" && <AddCourse />}
        {active === "Payments" && <Payment />}
        {active === "Contact Messages" && <UserMessages />}

        {active === "Dashboard" && <h1>Welcome to Admin Panel</h1>}
      </div>
    </div>
  );
};

export default AdminDashboard;
