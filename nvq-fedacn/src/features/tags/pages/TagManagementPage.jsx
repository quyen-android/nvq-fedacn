import {
  Edit,
  Trash2,
  Tags,
  Loader2,
  ArrowUpDown,
  Search,
} from "lucide-react";

import {
  useMemo,
  useRef,
  useState,
} from "react";

import { useTags } from "../hooks/useTags";
import TagForm from "../components/TagForm";
import DashboardLayout from "../../../components/layout/DashboardLayout";

import "./TagManagementPage.scss";

export default function TagManagementPage() {
  const {
    tags,
    placeTypes,
    editingTag,
    setEditingTag,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useTags();

  const formRef = useRef(null);

  const [keyword, setKeyword] =
    useState("");

  const [sortBy, setSortBy] =
    useState("tag");

  const [sortOrder, setSortOrder] =
    useState("asc");

  const handleEditClick = (tag) => {
    setEditingTag(tag);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const filteredTags = useMemo(() => {
    const searchValue =
      keyword.trim().toLowerCase();

    let result = [...tags];

    if (searchValue) {
      result = result.filter((tag) => {
        const tagName =
          tag.ten_the?.toLowerCase() || "";

        const typeName =
          tag.ten_loai?.toLowerCase() || "";

        return (
          tagName.includes(searchValue) ||
          typeName.includes(searchValue)
        );
      });
    }

    result.sort((a, b) => {
      const valueA =
        sortBy === "tag"
          ? a.ten_the || ""
          : a.ten_loai || "";

      const valueB =
        sortBy === "tag"
          ? b.ten_the || ""
          : b.ten_loai || "";

      return sortOrder === "asc"
        ? valueA.localeCompare(
            valueB,
            "vi"
          )
        : valueB.localeCompare(
            valueA,
            "vi"
          );
    });

    return result;
  }, [tags, keyword, sortBy, sortOrder]);

  return (
    <DashboardLayout>
      <div className="tag-page">
        <div className="tag-page__header">
          <div>
            <h1>Quản lý thẻ</h1>

            <p>
              Quản lý các thẻ dùng để phân
              loại và lọc địa điểm
            </p>
          </div>

          <div className="tag-page__icon">
            <Tags size={26} />
          </div>
        </div>

        {error && (
          <div className="tag-page__error">
            {error}
          </div>
        )}

        <div ref={formRef}>
          <TagForm
            placeTypes={placeTypes}
            editingTag={editingTag}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onCancel={() =>
              setEditingTag(null)
            }
          />
        </div>

        <section className="tag-table-card">
          <div className="tag-table-card__header">
            <div>
              <h2>Danh sách thẻ</h2>

              <p>
                Tổng {filteredTags.length} thẻ
              </p>
            </div>
          </div>

          <div className="tag-table-card__toolbar">
            <div className="tag-table-card__search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Tìm kiếm tên thẻ hoặc loại địa điểm..."
                value={keyword}
                onChange={(e) =>
                  setKeyword(e.target.value)
                }
              />
            </div>
          </div>

          {loading ? (
            <div className="tag-page__loading">
              <Loader2
                size={24}
                className="spin"
              />

              <span>
                Đang tải dữ liệu...
              </span>
            </div>
          ) : (
            <div className="tag-table-wrapper">
              <table className="tag-table">
                <thead>
                  <tr>
                    <th>
                      <button
                        className="tag-table__sort"
                        onClick={() =>
                          handleSort("tag")
                        }
                      >
                        Tên thẻ
                        <ArrowUpDown size={15} />
                      </button>
                    </th>

                    <th>
                      <button
                        className="tag-table__sort"
                        onClick={() =>
                          handleSort("type")
                        }
                      >
                        Loại địa điểm
                        <ArrowUpDown size={15} />
                      </button>
                    </th>

                    <th>Hành động</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTags.length === 0 ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="tag-table__empty"
                      >
                        Không có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    filteredTags.map((tag) => (
                      <tr key={tag.ma_the}>
                        <td>
                          <span className="tag-table__name">
                            {tag.ten_the}
                          </span>
                        </td>

                        <td>
                          <span className="tag-table__type">
                            {tag.ten_loai ||
                              "Chưa phân loại"}
                          </span>
                        </td>

                        <td>
                          <div className="tag-table__actions">
                            <button
                              className="tag-table__btn tag-table__btn--edit"
                              onClick={() =>
                                handleEditClick(tag)
                              }
                            >
                              <Edit size={16} />
                              Sửa
                            </button>

                            <button
                              className="tag-table__btn tag-table__btn--delete"
                              onClick={() =>
                                handleDelete(
                                  tag.ma_the
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