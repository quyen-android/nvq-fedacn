import {
  Edit,
  Trash2,
  Tags,
  Loader2,
} from "lucide-react";

import { useTags } from "../hooks/useTags";
import TagForm from "../components/TagForm";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useRef } from "react";
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

    const handleEditClick = (tag) => {
        setEditingTag(tag);

        setTimeout(() => {
            formRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            });
        }, 100);
    };

    return (
        <DashboardLayout>
        <div className="tag-page">
            <div className="tag-page__header">
            <div>
                <h1>Quản lý thẻ</h1>
                <p>Quản lý các thẻ dùng để phân loại và lọc địa điểm</p>
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
                onCancel={() => setEditingTag(null)}
            />
            </div>

            <section className="tag-table-card">
            <div className="tag-table-card__header">
                <div>
                <h2>Danh sách thẻ</h2>
                <p>Tổng {tags.length} thẻ</p>
                </div>
            </div>

            {loading ? (
                <div className="tag-page__loading">
                <Loader2 size={24} className="spin" />
                <span>Đang tải dữ liệu...</span>
                </div>
            ) : (
                <div className="tag-table-wrapper">
                <table className="tag-table">
                    <thead>
                    <tr>
                        <th>Tên thẻ</th>
                        <th>Loại địa điểm</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>

                    <tbody>
                    {tags.length === 0 ? (
                        <tr>
                        <td colSpan="3" className="tag-table__empty">
                            Chưa có thẻ nào
                        </td>
                        </tr>
                    ) : (
                        tags.map((tag) => (
                        <tr key={tag.ma_the}>
                            <td>
                            <span className="tag-table__name">
                                {tag.ten_the}
                            </span>
                            </td>

                            <td>
                            <span className="tag-table__type">
                                {tag.ten_loai || "Chưa phân loại"}
                            </span>
                            </td>

                            <td>
                            <div className="tag-table__actions">
                                <button
                                    className="tag-table__btn tag-table__btn--edit"
                                    onClick={() => handleEditClick(tag)}
                                >
                                <Edit size={16} />
                                Sửa
                                </button>

                                <button
                                    className="tag-table__btn tag-table__btn--delete"
                                    onClick={() => handleDelete(tag.ma_the)}
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