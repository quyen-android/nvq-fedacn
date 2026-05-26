import { useEffect, useState } from "react";

import "./PlaceTypeForm.scss";

export default function PlaceTypeForm({
  editingPlaceType,
  onCreate,
  onUpdate,
  onCancel,
}) {
  const [formData, setFormData] =
    useState({
      ten_loai: "",
    });

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (editingPlaceType) {
      setFormData({
        ten_loai:
          editingPlaceType.ten_loai || "",
      });
    } else {
      setFormData({
        ten_loai: "",
      });
    }

    setError("");
  }, [editingPlaceType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ten_loai.trim()) {
      setError(
        "Vui lòng nhập tên loại địa điểm"
      );
      return;
    }

    setError("");

    if (editingPlaceType) {
      await onUpdate(
        editingPlaceType.ma_loai,
        formData
      );
    } else {
      await onCreate(formData);
    }

    setFormData({
      ten_loai: "",
    });
  };

  return (
    <form
      className="place-type-form"
      onSubmit={handleSubmit}
    >
      <div className="place-type-form__header">
        <h2>
          {editingPlaceType
            ? "Cập nhật loại địa điểm"
            : "Thêm loại địa điểm"}
        </h2>

        <p>
          Quản lý danh mục loại địa điểm
          cho hệ thống
        </p>
      </div>

      {error && (
        <div className="place-type-form__error">
          {error}
        </div>
      )}

      <div className="place-type-form__group">
        <label>
          Tên loại địa điểm
        </label>

        <input
          type="text"
          placeholder="Ví dụ: Quán ăn, Khách sạn..."
          value={formData.ten_loai}
          onChange={(e) => {
            setFormData({
              ...formData,
              ten_loai: e.target.value,
            });

            if (error) {
              setError("");
            }
          }}
        />
      </div>

      <div className="place-type-form__actions">
        <button type="submit">
          {editingPlaceType
            ? "Lưu thay đổi"
            : "Thêm loại"}
        </button>

        {editingPlaceType && (
          <button
            type="button"
            className="place-type-form__cancel"
            onClick={onCancel}
          >
            Hủy sửa
          </button>
        )}
      </div>
    </form>
  );
}