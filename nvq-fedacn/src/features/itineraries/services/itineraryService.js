const API_URL = import.meta.env.VITE_API_URL;

export async function generateItinerary(maChuyenDi) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(
    `${API_URL}/ai-planner/${maChuyenDi}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Tạo lịch trình thất bại");
  }

  return result;
}