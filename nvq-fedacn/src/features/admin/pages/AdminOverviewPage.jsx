import {
  Users,
  MapPin,
  Plane,
  Bot,
  TrendingUp,
  Star,
} from "lucide-react";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import "./AdminOverviewPage.scss";

const stats = [
  {
    title: "Người dùng",
    value: "1,245",
    icon: Users,
  },
  {
    title: "Địa điểm",
    value: "328",
    icon: MapPin,
  },
  {
    title: "Chuyến đi",
    value: "856",
    icon: Plane,
  },
  {
    title: "Yêu cầu AI",
    value: "2,431",
    icon: Bot,
  },
];

const topPlaces = [
  {
    name: "Bà Nà Hills",
    type: "Điểm tham quan",
    count: 128,
  },
  {
    name: "Mỹ Khê",
    type: "Biển",
    count: 96,
  },
  {
    name: "Hội An",
    type: "Phố cổ",
    count: 82,
  },
];

const aiLogs = [
  {
    user: "Nguyễn Văn A",
    action: "Tạo lịch trình Đà Nẵng 3N2Đ",
    status: "Thành công",
  },
  {
    user: "Trần Thị B",
    action: "Gợi ý địa điểm ăn uống",
    status: "Thành công",
  },
  {
    user: "Lê Văn C",
    action: "Tối ưu ngân sách chuyến đi",
    status: "Đang xử lý",
  },
];

export default function AdminOverviewPage() {
  return (
    <DashboardLayout>
      <div className="admin-overview">
        <div className="admin-overview__heading">
          <div>
            <h1>Tổng quan</h1>
            <p>Theo dõi hoạt động hệ thống AI Travel</p>
          </div>

          <button>
            <TrendingUp size={18} />
            Báo cáo tháng
          </button>
        </div>

        <div className="admin-overview__stats">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div className="stat-card" key={item.title}>
                <div className="stat-card__icon">
                  <Icon size={24} />
                </div>

                <div>
                  <p>{item.title}</p>
                  <h2>{item.value}</h2>
                </div>
              </div>
            );
          })}
        </div>

        <div className="admin-overview__grid">
          <section className="overview-card overview-card--large">
            <div className="overview-card__header">
              <div>
                <h3>Chuyến đi theo tuần</h3>
                <p>Số chuyến đi được tạo gần đây</p>
              </div>
            </div>

            <div className="trip-chart">
              {[45, 70, 52, 88, 64, 95, 76].map((height, index) => (
                <div className="trip-chart__item" key={index}>
                  <div
                    className="trip-chart__bar"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span>T{index + 2}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="overview-card">
            <div className="overview-card__header">
              <div>
                <h3>Địa điểm nổi bật</h3>
                <p>Được AI đề xuất nhiều</p>
              </div>
            </div>

            <div className="top-place-list">
              {topPlaces.map((place) => (
                <div className="top-place-list__item" key={place.name}>
                  <div className="top-place-list__icon">
                    <Star size={18} />
                  </div>

                  <div>
                    <h4>{place.name}</h4>
                    <p>{place.type}</p>
                  </div>

                  <span>{place.count}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="overview-card">
          <div className="overview-card__header">
            <div>
              <h3>Nhật ký AI gần đây</h3>
              <p>Các hoạt động AI mới nhất trong hệ thống</p>
            </div>
          </div>

          <div className="ai-log-table">
            <table>
              <thead>
                <tr>
                  <th>Người dùng</th>
                  <th>Hoạt động</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>

              <tbody>
                {aiLogs.map((log, index) => (
                  <tr key={index}>
                    <td>{log.user}</td>
                    <td>{log.action}</td>
                    <td>
                      <span
                        className={
                          log.status === "Thành công"
                            ? "status status--success"
                            : "status status--pending"
                        }
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}