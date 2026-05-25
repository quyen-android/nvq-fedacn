import ItineraryItem from "./ItineraryItem";

export default function DaySchedule({ day }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        marginBottom: "16px",
        borderRadius: "12px",
      }}
    >
      <h3>Ngày {day.day}</h3>

      <p>
        <strong>Chỗ ở:</strong>{" "}
        {day.accommodation || "Chưa có"}
      </p>

      <p>
        <strong>Tổng quãng đường:</strong>{" "}
        {day.total_distance} km
      </p>

      {day.cost && (
        <div>
          <p>
            <strong>Chi phí ngày:</strong>{" "}
            {day.cost.total_day_cost?.toLocaleString("vi-VN")} VNĐ
          </p>
        </div>
      )}

      <h4>Lịch di chuyển</h4>

      {(day.segments || []).map((segment, index) => (
        <ItineraryItem
          key={index}
          segment={segment}
        />
      ))}
    </div>
  );
}