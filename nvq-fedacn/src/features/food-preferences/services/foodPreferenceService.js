const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem("access_token");
}

export async function getFoodPreferences() {
  const res = await fetch(`${API_URL}/so-thich-am-thuc`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Lấy sở thích ẩm thực thất bại");
  }

  return data;
}

export async function createFoodPreference(payload) {
  const res = await fetch(`${API_URL}/so-thich-am-thuc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Thêm sở thích ẩm thực thất bại");
  }

  return data;
}

export async function updateFoodPreference(maSoThich, payload) {
  const res = await fetch(`${API_URL}/so-thich-am-thuc/${maSoThich}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Cập nhật sở thích ẩm thực thất bại");
  }

  return data;
}

export async function deleteFoodPreference(maSoThich) {
  const res = await fetch(`${API_URL}/so-thich-am-thuc/${maSoThich}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Xóa sở thích ẩm thực thất bại");
  }

  return data;
}