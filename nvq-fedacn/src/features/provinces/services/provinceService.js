const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem("access_token");
}

export async function getProvinces() {
  const res = await fetch(`${API_URL}/tinh`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Lấy danh sách tỉnh thất bại");
  }

  return data;
}

export async function getCoordinates(query) {
  const res = await fetch(
    `${API_URL}/geo/search?query=${encodeURIComponent(query)}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Không lấy được tọa độ");
  }

  return data;
}

export async function createProvince(payload) {
  const res = await fetch(`${API_URL}/tinh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Thêm tỉnh thất bại");
  }

  return data;
}

export async function updateProvince(maTinh, payload) {
  const res = await fetch(`${API_URL}/tinh/${maTinh}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Cập nhật tỉnh thất bại");
  }

  return data;
}

export async function deleteProvince(maTinh) {
  const res = await fetch(`${API_URL}/tinh/${maTinh}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Xóa tỉnh thất bại");
  }

  return data;
}