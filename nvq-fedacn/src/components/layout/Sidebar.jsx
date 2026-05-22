import {
  Utensils,
  Hotel,
  Camera,
  Route,
} from "lucide-react";

import "./Sidebar.scss";

const menus = [
  {
    title: "Quán ăn",
    icon: Utensils,
  },
  {
    title: "Khách sạn",
    icon: Hotel,
  },
  {
    title: "Điểm tham quan",
    icon: Camera,
  },
  {
    title: "Lịch trình của tôi",
    icon: Route,
  },
];

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div>
        <div className="sidebar__logo">
          <img
            src="/logo.png"
            alt="TripAI"
            className="sidebar__logo-img"
          />

        </div>

        <nav className="sidebar__menu">
          {menus.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="sidebar__item">
                <div className="sidebar__item-icon">
                  <Icon size={20} />
                </div>

                <span>{item.title}</span>
              </div>
            );
          })}

          <div className="sidebar__item sidebar__item--active">
            <span>✨ Tạo chuyến đi</span>
          </div>
        </nav>
      </div>

      <div className="sidebar__user">
        <img
          src="https://i.pravatar.cc/100"
          alt=""
        />

        <div>
          <h3>Nguyễn Văn A</h3>
          <p>Premium</p>
        </div>
      </div>
    </div>
  );
}