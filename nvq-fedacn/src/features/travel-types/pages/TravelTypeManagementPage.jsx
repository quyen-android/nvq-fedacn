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
} from "lucide-react";

import { useTravelTypes } from "../hooks/useTravelTypes";

import TravelTypeForm from "../components/TravelTypeForm";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import "./TravelTypeManagementPage.scss";

export default function TravelTypeManagementPage() {
  const formRef = useRef(null);
  const errorRef = useRef(null);

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

  const sortedTravelTypes =
    useMemo(() => {
      const sorted = [...travelTypes];

      sorted.sort((a, b) => {
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

      return sorted;
    }, [travelTypes, sortOrder]);

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
            <h1>
              Quản lý loại du lịch
            </h1>

            <p>
              Thêm, sửa, xóa các loại
              hình du lịch trong hệ
              thống.
            </p>
          </div>

          <div className="page-icon">
            <Map size={28} />
          </div>
        </div>

        <div ref={formRef}>
          <TravelTypeForm
            editingTravelType={
              editingTravelType
            }
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
              <h2>
                Danh sách loại du lịch
              </h2>

              <p>
                Tổng{" "}
                {
                  travelTypes.length
                } loại du lịch
              </p>
            </div>
          </div>

          {loading ? (
            <div className="loading-box">
              <Loader2
                size={24}
                className="spin"
              />

              <span>
                Đang tải dữ liệu...
              </span>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="travel-type-table">
                <thead>
                    <tr>
                        <th>
                        <button
                            className="tag-table__sort"
                            onClick={() =>
                            handleSort("tag")
                            }
                        >
                            Tên loại du lịch

                            <ArrowUpDown
                            size={15}
                            />
                        </button>
                        </th>

                        <th>Hành động</th>
                    </tr>
                
                </thead>

                <tbody>
                  {sortedTravelTypes.length ===
                  0 ? (
                    <tr>
                      <td
                        colSpan="2"
                        className="empty-text"
                      >
                        Chưa có loại du
                        lịch nào
                      </td>
                    </tr>
                  ) : (
                    sortedTravelTypes.map(
                      (item) => (
                        <tr
                          key={
                            item.ma_loai_du_lich
                          }
                        >
                          <td>
                            {
                              item.ten_loai
                            }
                          </td>

                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-edit"
                                onClick={() =>
                                  handleEdit(
                                    item
                                  )
                                }
                              >
                                <Pencil
                                  size={
                                    15
                                  }
                                />

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
                                <Trash2
                                  size={
                                    15
                                  }
                                />

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
        </div>
      </div>
    </DashboardLayout>
  );
}