const API_URL = import.meta.env.VITE_API_URL;

export async function getTripOptions() {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/trip-options`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Lấy dữ liệu lựa chọn thất bại");
  }

  return result;
}

export async function createTrip(data) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/chuyen-di`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Tạo chuyến đi thất bại");
  }

  return result;
}