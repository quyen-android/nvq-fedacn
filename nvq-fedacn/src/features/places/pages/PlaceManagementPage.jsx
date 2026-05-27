import { ArrowUpDown } from "lucide-react";

import { usePlaces } from "../hooks/usePlaces";
import PlaceForm from "../components/PlaceForm";

export default function PlaceManagementPage() {
  const {
    places,
    provinces,
    placeTypes,

    editingPlace,
    setEditingPlace,

    loading,
    keyword,
    setKeyword,
    sortOrder,
    toggleSortOrder,

    handleCreate,
    handleUpdate,
    handleDelete,
  } = usePlaces();

  return (
    <div>
      <h1>Quản lý địa điểm</h1>

      <PlaceForm
        provinces={provinces}
        placeTypes={placeTypes}
        editingPlace={editingPlace}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onCancel={() => setEditingPlace(null)}
      />

      <h2>Danh sách địa điểm</h2>

      <input
        type="text"
        placeholder="Tìm kiếm địa điểm..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>Tên địa điểm</span>
                  <button
                    type="button"
                    onClick={toggleSortOrder}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                    title={sortOrder === "asc" ? "A-Z" : "Z-A"}
                  >
                    <ArrowUpDown size={16} />
                  </button>
                </div>
              </th>
              <th>Tỉnh</th>
              <th>Loại</th>
              <th>Giá TB</th>
              <th>Giờ mở</th>
              <th>Giờ đóng</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {places.map((item) => (
              <tr key={item.ma_dia_diem}>
                <td>{item.ten}</td>
                <td>{item.ten_tinh || item.ma_tinh}</td>
                <td>{item.ten_loai || item.ma_loai}</td>
                <td>{Number(item.gia_trung_binh || 0).toLocaleString("vi-VN")}</td>
                <td>{item.gio_mo}</td>
                <td>{item.gio_dong}</td>
                <td>
                  <button onClick={() => setEditingPlace(item)}>
                    Sửa
                  </button>

                  <button onClick={() => handleDelete(item.ma_dia_diem)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}

            {places.length === 0 && (
              <tr>
                <td colSpan="7">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}