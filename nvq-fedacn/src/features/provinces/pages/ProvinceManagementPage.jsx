import {
  Search,
  ArrowUpDown,
  Pencil,
  Trash2,
  MapPinned,
  Loader2,
} from "lucide-react";

import ProvinceForm from "../components/ProvinceForm";
import { useProvinces } from "../hooks/useProvinces";
import DashboardLayout from "../../../components/layout/DashboardLayout";

import "./ProvinceManagementPage.scss";

export default function ProvinceManagementPage() {
  const {
    provinces,
    filteredProvinces,
    editingProvince,
    setEditingProvince,
    loading,
    keyword,
    setKeyword,
    sortOrder,
    toggleSortOrder,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useProvinces();

  return (
    <DashboardLayout>
      <div className="province-page">
        <div className="province-page__header">
          <div>
            <h1>Quản lý tỉnh</h1>

            <p>
              Quản lý tỉnh, quốc gia, kinh độ và vĩ độ
              trong hệ thống.
            </p>
          </div>

          <div className="province-page__icon">
            <MapPinned size={26} />
          </div>
        </div>

        <ProvinceForm
          editingProvince={editingProvince}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancel={() =>
            setEditingProvince(null)
          }
        />

        <section className="province-table-card">
          <div className="province-table-card__header">
            <div>
              <h2>Danh sách tỉnh</h2>

              <p>
                Tổng {filteredProvinces.length} tỉnh
              </p>
            </div>
          </div>

          <div className="province-table-card__toolbar">
            <div className="province-table-card__search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Tìm kiếm tỉnh..."
                value={keyword}
                onChange={(e) =>
                  setKeyword(e.target.value)
                }
              />
            </div>
          </div>

          {loading ? (
            <div className="province-page__loading">
              <Loader2
                size={24}
                className="spin"
              />

              <span>Đang tải dữ liệu...</span>
            </div>
          ) : (
            <div className="province-table-wrapper">
              <table className="province-table">
                <thead>
                  <tr>
                    <th>
                      <button
                        type="button"
                        className="province-table__sort"
                        onClick={toggleSortOrder}
                        title={
                          sortOrder === "asc"
                            ? "Đang sắp xếp A-Z"
                            : "Đang sắp xếp Z-A"
                        }
                      >
                        <span>Tỉnh</span>

                        <ArrowUpDown size={15} />
                      </button>
                    </th>

                    <th>Quốc gia</th>
                    <th>Kinh độ</th>
                    <th>Vĩ độ</th>
                    <th>Hành động</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProvinces.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="province-table__empty"
                      >
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    filteredProvinces.map(
                      (item) => (
                        <tr key={item.ma_tinh}>
                          <td>
                            <span className="province-table__name">
                              {item.ten_tinh}
                            </span>
                          </td>

                          <td>
                            {item.quoc_gia}
                          </td>

                          <td>
                            {item.kinh_do}
                          </td>

                          <td>
                            {item.vi_do}
                          </td>

                          <td>
                            <div className="province-table__actions">
                              <button
                                className="province-table__btn province-table__btn--edit"
                                onClick={() =>
                                  setEditingProvince(
                                    item
                                  )
                                }
                              >
                                <Pencil size={16} />
                                Sửa
                              </button>

                              <button
                                className="province-table__btn province-table__btn--delete"
                                onClick={() =>
                                  handleDelete(
                                    item.ma_tinh
                                  )
                                }
                              >
                                <Trash2 size={16} />
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}