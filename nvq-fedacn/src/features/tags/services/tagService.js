const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem("access_token");
}

export async function getTags() {
  const res = await fetch(`${API_URL}/the`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Lấy danh sách thẻ thất bại");
  }

  return data;
}

export async function getPlaceTypes() {
  const res = await fetch(`${API_URL}/loai_dia_diem`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Lấy loại địa điểm thất bại");
  }

  return data;
}

export async function createTag(payload) {
  const res = await fetch(`${API_URL}/the`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Thêm thẻ thất bại");
  }

  return data;
}

export async function updateTag(maThe, payload) {
  const res = await fetch(`${API_URL}/the/${maThe}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Cập nhật thẻ thất bại");
  }

  return data;
}

export async function deleteTag(maThe) {
  const res = await fetch(`${API_URL}/the/${maThe}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Xóa thẻ thất bại");
  }

  return data;
}