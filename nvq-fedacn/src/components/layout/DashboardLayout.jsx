import Sidebar from "./Sidebar";
import "./DashboardLayout.scss";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-layout__sidebar">
        <Sidebar />
      </aside>

      <main className="dashboard-layout__main">
        {children}
      </main>
    </div>
  );
}