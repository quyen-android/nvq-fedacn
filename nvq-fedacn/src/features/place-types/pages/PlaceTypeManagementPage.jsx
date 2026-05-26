import {
  Edit,
  Trash2,
  MapPinned,
  Loader2,
  ArrowUpDown,
  Search,
} from "lucide-react";

import {
  useMemo,
  useRef,
  useState,
} from "react";

import { usePlaceTypes } from "../hooks/usePlaceTypes";
import PlaceTypeForm from "../components/PlaceTypeForm";
import DashboardLayout from "../../../components/layout/DashboardLayout";

import "./PlaceTypeManagementPage.scss";

export default function PlaceTypeManagementPage() {
  const {
    placeTypes,
    editingPlaceType,
    setEditingPlaceType,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = usePlaceTypes();

  const formRef = useRef(null);

  const [keyword, setKeyword] =
    useState("");

  const [sortOrder, setSortOrder] =
    useState("asc");

  function handleEditClick(item) {
    setEditingPlaceType(item);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  function handleSort() {
    setSortOrder((prev) =>
      prev === "asc" ? "desc" : "asc"
    );
  }

  const filteredPlaceTypes = useMemo(() => {
    const searchValue =
      keyword.trim().toLowerCase();

    let result = [...placeTypes];

    if (searchValue) {
      result = result.filter((item) =>
        item.ten_loai
          ?.toLowerCase()
          .includes(searchValue)
      );
    }

    result.sort((a, b) => {
      return sortOrder === "asc"
        ? a.ten_loai.localeCompare(
            b.ten_loai,
            "vi"
          )
        : b.ten_loai.localeCompare(
            a.ten_loai,
            "vi"
          );
    });

    return result;
  }, [placeTypes, keyword, sortOrder]);

  return (
    <DashboardLayout>
      <div className="place-type-page">
        <div className="place-type-page__header">
          <div>
            <h1>
              Quản lý loại địa điểm
            </h1>

            <p>
              Quản lý các danh mục loại địa
              điểm trong hệ thống
            </p>
          </div>

          <div className="place-type-page__icon">
            <MapPinned size={26} />
          </div>
        </div>

        <div ref={formRef}>
          <PlaceTypeForm
            editingPlaceType={editingPlaceType}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onCancel={() =>
              setEditingPlaceType(null)
            }
          />
        </div>

        <section className="place-type-table-card">
          <div className="place-type-table-card__header">
            <div>
              <h2>
                Danh sách loại địa điểm
              </h2>

              <p>
                Tổng {filteredPlaceTypes.length} loại
                địa điểm
              </p>
            </div>
          </div>

          <div className="place-type-table-card__toolbar">
            <div className="place-type-table-card__search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Tìm kiếm loại địa điểm..."
                value={keyword}
                onChange={(e) =>
                  setKeyword(e.target.value)
                }
              />
            </div>
          </div>

          {loading ? (
            <div className="place-type-page__loading">
              <Loader2
                size={24}
                className="spin"
              />

              <span>
                Đang tải dữ liệu...
              </span>
            </div>
          ) : (
            <div className="place-type-table-wrapper">
              <table className="place-type-table">
                <thead>
                  <tr>
                    <th>
                      <button
                        type="button"
                        className="place-type-table__sort-title"
                        onClick={handleSort}
                      >
                        <span>
                          Tên loại địa điểm
                        </span>

                        <ArrowUpDown size={15} />
                      </button>
                    </th>

                    <th>
                      Hành động
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPlaceTypes.length === 0 ? (
                    <tr>
                      <td
                        colSpan="2"
                        className="place-type-table__empty"
                      >
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    filteredPlaceTypes.map((item) => (
                      <tr key={item.ma_loai}>
                        <td>
                          <span className="place-type-table__name">
                            {item.ten_loai}
                          </span>
                        </td>

                        <td>
                          <div className="place-type-table__actions">
                            <button
                              className="place-type-table__btn place-type-table__btn--edit"
                              onClick={() =>
                                handleEditClick(item)
                              }
                            >
                              <Edit size={16} />
                              Sửa
                            </button>

                            <button
                              className="place-type-table__btn place-type-table__btn--delete"
                              onClick={() =>
                                handleDelete(
                                  item.ma_loai
                                )
                              }
                            >
                              <Trash2 size={16} />
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
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