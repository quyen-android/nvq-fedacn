import {
  MapPin,
  CalendarDays,
  Wallet,
  Landmark,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";

export default function ItinerarySummary({ itinerary }) {
  const context = itinerary.context || {};
  const summary = itinerary.summary || {};
  const costSummary = itinerary.cost_summary || {};

  const isOverBudget = costSummary.is_over_budget;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1b2559]">
            Tổng quan chuyến đi
          </h2>
          <p className="text-sm text-gray-400">
            Thông tin chính của lịch trình AI
          </p>
        </div>

        <div
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            isOverBudget
              ? "bg-red-50 text-red-500"
              : "bg-green-50 text-green-600"
          }`}
        >
          {isOverBudget ? "Vượt ngân sách" : "Phù hợp ngân sách"}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={<MapPin size={22} />}
          label="Tên chuyến đi"
          value={context.ten_chuyen_di || "Chưa có"}
        />

        <SummaryCard
          icon={<Landmark size={22} />}
          label="Tỉnh đến"
          value={context.tinh_den || "Chưa có"}
        />

        <SummaryCard
          icon={<CalendarDays size={22} />}
          label="Số ngày"
          value={`${context.so_ngay || 0} ngày`}
        />

        <SummaryCard
          icon={<MapPin size={22} />}
          label="Tổng địa điểm"
          value={`${summary.total_travel_places || 0} địa điểm`}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <CostCard
          icon={<Wallet size={22} />}
          label="Tổng chi phí"
          value={costSummary.total_cost}
        />

        <CostCard
          icon={<Landmark size={22} />}
          label="Ngân sách"
          value={costSummary.budget}
        />

        <CostCard
          icon={
            isOverBudget ? (
              <AlertTriangle size={22} />
            ) : (
              <TrendingDown size={22} />
            )
          }
          label={isOverBudget ? "Vượt ngân sách" : "Còn lại"}
          value={
            isOverBudget
              ? costSummary.over_budget_amount
              : costSummary.remaining_budget
          }
          danger={isOverBudget}
        />
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-[#f8faff] p-5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#1b2559] shadow-sm">
        {icon}
      </div>

      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-1 font-bold text-[#1b2559]">{value}</p>
    </div>
  );
}

function CostCard({ icon, label, value, danger = false }) {
  return (
    <div
      className={`rounded-2xl p-5 ${
        danger ? "bg-red-50" : "bg-green-50"
      }`}
    >
      <div
        className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white ${
          danger ? "text-red-500" : "text-green-600"
        }`}
      >
        {icon}
      </div>

      <p className="text-sm text-gray-500">{label}</p>
      <p
        className={`mt-1 text-xl font-bold ${
          danger ? "text-red-500" : "text-green-700"
        }`}
      >
        {(value || 0).toLocaleString("vi-VN")} VNĐ
      </p>
    </div>
  );
}