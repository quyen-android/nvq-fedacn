const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem("access_token");
}

export async function getPlaceTypes() {
  const res = await fetch(`${API_URL}/loai-dia-diem`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Lấy loại địa điểm thất bại");
  }

  return data;
}

export async function createPlaceType(payload) {
  const res = await fetch(`${API_URL}/loai-dia-diem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Thêm loại địa điểm thất bại");
  }

  return data;
}

export async function updatePlaceType(maLoai, payload) {
  const res = await fetch(`${API_URL}/loai-dia-diem/${maLoai}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Cập nhật loại địa điểm thất bại");
  }

  return data;
}

export async function deletePlaceType(maLoai) {
  const res = await fetch(`${API_URL}/loai-dia-diem/${maLoai}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Xóa loại địa điểm thất bại");
  }

  return data;
}