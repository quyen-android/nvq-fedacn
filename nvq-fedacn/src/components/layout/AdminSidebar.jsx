import {
  LayoutDashboard,
  MapPin,
  Tags,
  Palmtree,
  HeartHandshake,
  Utensils,
  Bot,
  LogOut,
} from "lucide-react";

import "./AdminSidebar.scss";

const menus = [
  { title: "Tổng quan", icon: LayoutDashboard },
  { title: "Quản lý địa điểm", icon: MapPin },
  { title: "Loại địa điểm", icon: Tags },
  { title: "Loại du lịch", icon: Palmtree },
  { title: "Yêu cầu đặc biệt", icon: HeartHandshake },
  { title: "Sở thích ẩm thực", icon: Utensils },
  { title: "Nhật ký AI", icon: Bot },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div>
        <div className="admin-sidebar__logo">
          <img src="/logo.png" alt="TripAI" />
        </div>

        <nav className="admin-sidebar__menu">
          {menus.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`admin-sidebar__item ${
                  index === 0 ? "admin-sidebar__item--active" : ""
                }`}
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="admin-sidebar__user">
        <img src="https://i.pravatar.cc/100?img=12" alt="Admin" />

        <div>
          <h3>Admin</h3>
          <p>Quản trị viên</p>
        </div>

        <button>
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}