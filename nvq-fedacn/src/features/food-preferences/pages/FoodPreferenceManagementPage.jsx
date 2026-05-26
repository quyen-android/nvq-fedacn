import {
  Search,
  ArrowUpDown,
  Pencil,
  Trash2,
  Utensils,
} from "lucide-react";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useFoodPreferences } from "../hooks/useFoodPreferences";
import FoodPreferenceForm from "../components/FoodPreferenceForm";

import "./FoodPreferenceManagementPage.scss";

export default function FoodPreferenceManagementPage() {
  const {
    foodPreferences,
    editingFoodPreference,
    setEditingFoodPreference,

    loading,
    keyword,
    setKeyword,
    sortOrder,
    setSortOrder,

    handleCreate,
    handleUpdate,
    handleDelete,
  } = useFoodPreferences();

  const handleToggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <DashboardLayout>
      <div className="food-dashboard">
        <div className="food-dashboard__header">
          <div>

            <h1>Quản lý sở thích ẩm thực</h1>

            <p>
              Thêm, sửa, xóa và tìm kiếm sở thích ẩm thực
              của người dùng.
            </p>
          </div>

          <div className="food-dashboard__icon">
            <Utensils size={30} />
          </div>
        </div>

        <FoodPreferenceForm
          editingFoodPreference={editingFoodPreference}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancel={() => setEditingFoodPreference(null)}
        />

        <div className="food-dashboard__card">
          <div className="food-dashboard__card-header">
            <div>
              <h2>Danh sách sở thích ẩm thực</h2>
              <p>Tổng cộng {foodPreferences.length} sở thích</p>
            </div>
          </div>

          <div className="food-dashboard__toolbar">
            <div className="food-dashboard__search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Tìm kiếm sở thích..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <p className="food-dashboard__loading">
              Đang tải...
            </p>
          ) : (
            <div className="food-dashboard__table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>
                      <button
                        type="button"
                        className="food-dashboard__sort-title"
                        onClick={handleToggleSort}
                      >
                        <span>Tên sở thích ẩm thực</span>
                        <ArrowUpDown size={16} />
                      </button>
                    </th>

                    <th>Hành động</th>
                  </tr>
                </thead>

                <tbody>
                  {foodPreferences.map((item) => (
                    <tr key={item.ma_so_thich}>
                      <td>{item.ten_so_thich}</td>

                      <td>
                        <div className="food-dashboard__actions">
                          <button
                            className="food-dashboard__btn food-dashboard__btn--edit"
                            onClick={() =>
                              setEditingFoodPreference(item)
                            }
                          >
                            <Pencil size={16} />
                            Sửa
                          </button>

                          <button
                            className="food-dashboard__btn food-dashboard__btn--delete"
                            onClick={() =>
                              handleDelete(item.ma_so_thich)
                            }
                          >
                            <Trash2 size={16} />
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {foodPreferences.length === 0 && (
                    <tr>
                      <td
                        colSpan="2"
                        className="food-dashboard__empty"
                      >
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