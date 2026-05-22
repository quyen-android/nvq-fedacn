import {
  Utensils,
  Hotel,
  Camera,
  Calendar,
  Plus,
  Route,
} from "lucide-react";

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
    <div className="w-[280px] bg-[#f7f9fc] border-r border-gray-100 flex flex-col justify-between">
      <div>
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500"></div>

            <div>
              <h1 className="font-bold text-3xl text-[#1b2559]">
                TripAI
              </h1>

              <p className="text-gray-400 text-sm">
                AI Travel Planner
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 space-y-3">
          {menus.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer hover:bg-white"
              >
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Icon size={20} className="text-orange-500" />
                </div>

                <span className="font-medium text-[#1b2559]">
                  {item.title}
                </span>
              </div>
            );
          })}

          <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#edf3ff] cursor-pointer">
            <span className="font-semibold text-blue-600">
              ✨ Tạo chuyến đi
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <img
            src="https://i.pravatar.cc/100"
            alt=""
            className="w-14 h-14 rounded-full"
          />

          <div>
            <h3 className="font-semibold text-[#1b2559]">
              Nguyễn Văn A
            </h3>

            <p className="text-orange-400 text-sm">
              Premium
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}