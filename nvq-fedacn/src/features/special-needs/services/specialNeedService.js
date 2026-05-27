const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem("access_token");
}

export async function getSpecialNeeds() {
  const res = await fetch(`${API_URL}/yeu-cau-dac-biet`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Lấy yêu cầu đặc biệt thất bại");
  }

  return data;
}

export async function createSpecialNeed(payload) {
  const res = await fetch(`${API_URL}/yeu-cau-dac-biet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Thêm yêu cầu đặc biệt thất bại");
  }

  return data;
}

export async function updateSpecialNeed(maYeuCau, payload) {
  const res = await fetch(`${API_URL}/yeu-cau-dac-biet/${maYeuCau}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Cập nhật yêu cầu đặc biệt thất bại");
  }

  return data;
}

export async function deleteSpecialNeed(maYeuCau) {
  const res = await fetch(`${API_URL}/yeu-cau-dac-biet/${maYeuCau}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Xóa yêu cầu đặc biệt thất bại");
  }

  return data;
}