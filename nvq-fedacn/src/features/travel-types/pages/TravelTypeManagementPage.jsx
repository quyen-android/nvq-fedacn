import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Loader2,
  Map,
  Pencil,
  Trash2,
  ArrowUpDown,
  Search,
} from "lucide-react";

import { useTravelTypes } from "../hooks/useTravelTypes";
import TravelTypeForm from "../components/TravelTypeForm";
import DashboardLayout from "../../../components/layout/DashboardLayout";

import "./TravelTypeManagementPage.scss";

export default function TravelTypeManagementPage() {
  const formRef = useRef(null);
  const errorRef = useRef(null);

  const [keyword, setKeyword] =
    useState("");

  const [sortOrder, setSortOrder] =
    useState("asc");

  const {
    travelTypes,
    editingTravelType,
    setEditingTravelType,
    loading,
    error,
    success,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useTravelTypes();

  function handleEdit(item) {
    setEditingTravelType(item);

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

  const filteredTravelTypes = useMemo(() => {
    const searchValue =
      keyword.trim().toLowerCase();

    let result = [...travelTypes];

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
  }, [travelTypes, keyword, sortOrder]);

  useEffect(() => {
    if (error) {
      errorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [error]);

  return (
    <DashboardLayout>
      <div className="travel-type-page">
        <div className="page-header">
          <div>
            <h1>Quản lý loại du lịch</h1>

            <p>
              Thêm, sửa, xóa các loại hình du lịch
              trong hệ thống.
            </p>
          </div>

          <div className="page-icon">
            <Map size={28} />
          </div>
        </div>

        <div ref={errorRef}>
          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          {success && (
            <div className="success-box">
              {success}
            </div>
          )}
        </div>

        <div ref={formRef}>
          <TravelTypeForm
            editingTravelType={editingTravelType}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onCancel={() =>
              setEditingTravelType(null)
            }
          />
        </div>

        <div className="table-card">
          <div className="table-header">
            <div>
              <h2>Danh sách loại du lịch</h2>

              <p>
                Tổng {filteredTravelTypes.length} loại du lịch
              </p>
            </div>
          </div>

          <div className="table-toolbar">
            <div className="table-search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Tìm kiếm loại du lịch..."
                value={keyword}
                onChange={(e) =>
                  setKeyword(e.target.value)
                }
              />
            </div>
          </div>

          {loading ? (
            <div className="loading-box">
              <Loader2
                size={24}
                className="spin"
              />

              <span>Đang tải dữ liệu...</span>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="travel-type-table">
                <thead>
                  <tr>
                    <th>
                      <button
                        type="button"
                        className="travel-type-table__sort"
                        onClick={handleSort}
                      >
                        <span>
                          Tên loại du lịch
                        </span>

                        <ArrowUpDown size={15} />
                      </button>
                    </th>

                    <th>Hành động</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTravelTypes.length === 0 ? (
                    <tr>
                      <td
                        colSpan="2"
                        className="empty-text"
                      >
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    filteredTravelTypes.map((item) => (
                      <tr
                        key={
                          item.ma_loai_du_lich
                        }
                      >
                        <td>{item.ten_loai}</td>

                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn-edit"
                              onClick={() =>
                                handleEdit(item)
                              }
                            >
                              <Pencil size={15} />
                              Sửa
                            </button>

                            <button
                              className="btn-delete"
                              onClick={() =>
                                handleDelete(
                                  item.ma_loai_du_lich
                                )
                              }
                            >
                              <Trash2 size={15} />
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
        </div>
      </div>
    </DashboardLayout>
  );
}