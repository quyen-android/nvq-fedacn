import {
  ArrowUpDown,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";

import { useSpecialNeeds } from "../hooks/useSpecialNeeds";
import SpecialNeedForm from "../components/SpecialNeedForm";
import DashboardLayout from "../../../components/layout/DashboardLayout";

import "./SpecialNeedManagementPage.scss";

export default function SpecialNeedManagementPage() {
  const {
    specialNeeds,
    editingSpecialNeed,
    setEditingSpecialNeed,
    loading,
    keyword,
    setKeyword,
    sortOrder,
    toggleSortOrder,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useSpecialNeeds();

  return (
    <DashboardLayout>
      <div className="special-need-page">
        <div className="special-need-page__header">
          <div>
            <h1>Quản lý yêu cầu đặc biệt</h1>
            <p>Thêm, sửa, xóa và tìm kiếm yêu cầu đặc biệt.</p>
          </div>
        </div>

        <SpecialNeedForm
          editingSpecialNeed={editingSpecialNeed}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancel={() => setEditingSpecialNeed(null)}
        />

        <div className="special-need-card">
          <div className="special-need-card__header">
            <h2>Danh sách yêu cầu đặc biệt</h2>
            <p>Tổng {specialNeeds.length} yêu cầu</p>
          </div>

          <div className="special-need-card__search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Tìm kiếm yêu cầu đặc biệt..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="special-need-page__loading">
              Đang tải...
            </div>
          ) : (
            <div className="special-need-table-wrap">
              <table className="special-need-table">
                <thead>
                  <tr>
                    <th>
                      <button
                        type="button"
                        className="special-need-table__sort"
                        onClick={toggleSortOrder}
                        title={
                          sortOrder === "asc"
                            ? "Đang sắp xếp A-Z"
                            : "Đang sắp xếp Z-A"
                        }
                      >
                        <span>Tên yêu cầu đặc biệt</span>
                        <ArrowUpDown size={16} />
                      </button>
                    </th>

                    <th>Hành động</th>
                  </tr>
                </thead>

                <tbody>
                  {specialNeeds.map((item) => (
                    <tr key={item.ma_yeu_cau}>
                      <td>{item.ten_yeu_cau}</td>

                      <td>
                        <div className="special-need-table__actions">
                          <button
                            className="special-need-table__btn special-need-table__btn--edit"
                            onClick={() => setEditingSpecialNeed(item)}
                          >
                            <Pencil size={16} />
                            Sửa
                          </button>

                          <button
                            className="special-need-table__btn special-need-table__btn--delete"
                            onClick={() => handleDelete(item.ma_yeu_cau)}
                          >
                            <Trash2 size={16} />
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {specialNeeds.length === 0 && (
                    <tr>
                      <td colSpan="2" className="special-need-table__empty">
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}