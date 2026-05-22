import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}