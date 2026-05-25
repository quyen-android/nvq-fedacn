export default function AIRecommendation({ itinerary }) {
  const costSummary = itinerary.cost_summary || {};

  return (
    <div>
      <h2>Gợi ý từ AI</h2>

      {costSummary.is_over_budget ? (
        <p>
          Chuyến đi đang vượt ngân sách. Bạn nên giảm số điểm tham quan
          có phí hoặc chọn chỗ ở rẻ hơn.
        </p>
      ) : (
        <p>
          Lịch trình hiện tại phù hợp với ngân sách của bạn.
        </p>
      )}
    </div>
  );
}