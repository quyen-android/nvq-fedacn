const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem("access_token");
}

export async function getPlaces() {
  const res = await fetch(`${API_URL}/dia-diem-admin`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Lấy địa điểm thất bại");
  }

  return data;
}

export async function getProvinces() {
  const res = await fetch(`${API_URL}/tinh`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Lấy tỉnh thất bại");
  }

  return data;
}

export async function getPlaceTypes() {
  const res = await fetch(`${API_URL}/loai-dia-diem`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Lấy loại địa điểm thất bại");
  }

  return data;
}

export async function createPlace(payload) {
  const formData = buildPlaceFormData(payload, true);

  const res = await fetch(`${API_URL}/dia-diem-admin`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Thêm địa điểm thất bại");
  }

  return data;
}

export async function updatePlace(id, payload) {
  const formData = buildPlaceFormData(payload, false);

  const res = await fetch(`${API_URL}/dia-diem-admin/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Cập nhật địa điểm thất bại");
  }

  return data;
}

export async function deletePlace(id) {
  const res = await fetch(`${API_URL}/dia-diem-admin/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Xóa địa điểm thất bại");
  }

  return data;
}

function appendIfNotEmpty(formData, key, value) {
  if (value !== undefined && value !== null && value !== "") {
    formData.append(key, value);
  }
}

function buildPlaceFormData(payload, isCreate) {
  const formData = new FormData();

  appendIfNotEmpty(formData, "ten", payload.ten);
  appendIfNotEmpty(formData, "ma_tinh", payload.ma_tinh);
  appendIfNotEmpty(formData, "ma_loai", payload.ma_loai);
  appendIfNotEmpty(formData, "dia_chi", payload.dia_chi);
  appendIfNotEmpty(formData, "mo_ta", payload.mo_ta);
  appendIfNotEmpty(formData, "kinh_do", payload.kinh_do);
  appendIfNotEmpty(formData, "vi_do", payload.vi_do);
  appendIfNotEmpty(formData, "gia_trung_binh", payload.gia_trung_binh);
  appendIfNotEmpty(formData, "gio_mo", payload.gio_mo);
  appendIfNotEmpty(formData, "gio_dong", payload.gio_dong);
  appendIfNotEmpty(formData, "website", payload.website);
  appendIfNotEmpty(formData, "sdt", payload.sdt);

  if (payload.anh_chinh) {
    formData.append("anh_chinh", payload.anh_chinh);
  }

  if (payload.anh_phu && payload.anh_phu.length > 0) {
    payload.anh_phu.forEach((file) => {
      formData.append("anh_phu", file);
    });
  }

  if (isCreate && !payload.anh_chinh) {
    throw new Error("Vui lòng chọn ảnh chính");
  }

  return formData;
}