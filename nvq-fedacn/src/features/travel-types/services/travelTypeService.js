const API_URL = import.meta.env.VITE_API_URL;

const BASE_URL = `${API_URL}/loai-du-lich`;

function getToken() {
  return localStorage.getItem("access_token");
}

async function handleResponse(res, fallbackMessage) {
  let data = null;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(
      data?.detail || fallbackMessage
    );
  }

  return data;
}

export async function getTravelTypes() {
  const res = await fetch(BASE_URL);

  return handleResponse(
    res,
    "Lấy loại du lịch thất bại"
  );
}

export async function createTravelType(payload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(
    res,
    "Thêm loại du lịch thất bại"
  );
}

export async function updateTravelType(
  maLoaiDuLich,
  payload
) {
  const res = await fetch(
    `${BASE_URL}/${maLoaiDuLich}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    }
  );

  return handleResponse(
    res,
    "Cập nhật loại du lịch thất bại"
  );
}

export async function deleteTravelType(maLoaiDuLich) {
  const res = await fetch(
    `${BASE_URL}/${maLoaiDuLich}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return handleResponse(
    res,
    "Xóa loại du lịch thất bại"
  );
}