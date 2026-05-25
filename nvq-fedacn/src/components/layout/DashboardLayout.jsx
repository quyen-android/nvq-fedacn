import Sidebar from "./Sidebar";
import AdminSidebar from "./AdminSidebar";
import "./DashboardLayout.scss";

import { getCurrentUser } from "../../features/auth/store/authStore";

export default function DashboardLayout({ children }) {

  const user = getCurrentUser();

  const role = user?.quyen;

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-layout__sidebar">
        {role === "admin"
          ? <AdminSidebar />
          : <Sidebar />
        }
      </aside>

      <main className="dashboard-layout__main">
        {children}
      </main>
    </div>
  );
}