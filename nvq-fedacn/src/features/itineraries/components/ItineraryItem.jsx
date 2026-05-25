export default function ItineraryItem({ segment }) {
  return (
    <div
      style={{
        padding: "10px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <p>
        <strong>{segment.from}</strong>
        {" → "}
        <strong>{segment.to}</strong>
      </p>

      <p>
        Khoảng cách: {segment.distance} km
      </p>

      <p>
        Phương tiện: {segment.vehicle || "Chưa chọn"}
      </p>

      <p>
        Số lượng: {segment.vehicle_count || 0}
      </p>

      <p>
        Chi phí:{" "}
        {(segment.cost || 0).toLocaleString("vi-VN")} VNĐ
      </p>
    </div>
  );
}