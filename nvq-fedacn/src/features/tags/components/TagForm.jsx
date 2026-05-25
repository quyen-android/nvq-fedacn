import { useEffect, useState } from "react";
import {
  Tag,
  Layers,
  Save,
  X,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import "./TagForm.scss";

const INITIAL_FORM = {
  ten_the: "",
  ma_loai: "",
};

export default function TagForm({
  placeTypes = [],
  editingTag,
  onCreate,
  onUpdate,
  onCancel,
}) {
    const [formData, setFormData] =
        useState(INITIAL_FORM);

    const [loading, setLoading] =
        useState(false);
    const [openSelect, setOpenSelect] =
        useState(false);

    const selectedPlaceType =
    placeTypes.find(
        (item) =>
        item.ma_loai === formData.ma_loai
    );
    const [focusedSelect, setFocusedSelect] =
        useState(false);

  useEffect(() => {
    if (editingTag) {
      setFormData({
        ten_the:
          editingTag.ten_the || "",
        ma_loai:
          editingTag.ma_loai || "",
      });
    } else {
      setFormData(INITIAL_FORM);
    }
  }, [editingTag]);

  const updateField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.ten_the.trim()) {
      alert("Vui lòng nhập tên thẻ");
      return false;
    }

    if (!formData.ma_loai) {
      alert(
        "Vui lòng chọn loại địa điểm"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        ...formData,
        ten_the:
          formData.ten_the.trim(),
      };

      if (editingTag) {
        await onUpdate(
          editingTag.ma_the,
          payload
        );
      } else {
        await onCreate(payload);
        setFormData(INITIAL_FORM);
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="tag-form"
      onSubmit={handleSubmit}
    >
      <div className="tag-form__glow"></div>

      <div className="tag-form__header">
        <div>

          <h2>
            {editingTag
              ? "Cập nhật thẻ"
              : "Tạo thẻ mới"}
          </h2>

          <p>
            {editingTag
              ? "Chỉnh sửa thông tin thẻ để phân loại địa điểm chính xác hơn."
              : "Tạo thẻ để lọc, tìm kiếm và nhóm địa điểm hiệu quả."}
          </p>
        </div>

        <div className="tag-form__badge">
          <Tag size={24} />
        </div>
      </div>

      <div className="tag-form__body">
        <div className="tag-form__group">
          <label>Tên thẻ</label>

          <div className="tag-form__input-wrap">
            <Tag size={18} />

            <input
              type="text"
              placeholder="Ví dụ: View đẹp, Gia đình..."
              value={formData.ten_the}
              onChange={(e) =>
                updateField(
                  "ten_the",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <div className="tag-form__group">
          <label>Loại địa điểm</label>

          <div
            className={`tag-form__input-wrap tag-form__input-wrap--select ${
              focusedSelect
                ? "tag-form__input-wrap--active"
                : ""
            }`}
          >
            <Layers size={18} />

            <select
              value={formData.ma_loai}
              onFocus={() =>
                setFocusedSelect(true)
              }
              onBlur={() =>
                setFocusedSelect(false)
              }
              onChange={(e) =>
                updateField(
                  "ma_loai",
                  e.target.value
                )
              }
            >
              <option value="">
                Chọn loại địa điểm
              </option>

              {placeTypes.map((item) => (
                <option
                  key={item.ma_loai}
                  value={item.ma_loai}
                >
                  {item.ten_loai}
                </option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className={`tag-form__select-arrow ${
                focusedSelect
                  ? "tag-form__select-arrow--active"
                  : ""
              }`}
            />
          </div>
        </div>
      </div>

      <div className="tag-form__actions">
        {editingTag && (
          <button
            type="button"
            className="tag-form__btn tag-form__btn--secondary"
            onClick={onCancel}
          >
            <X size={18} />
            Hủy
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="tag-form__btn tag-form__btn--primary"
        >
          <Save size={18} />

          {loading
            ? "Đang lưu..."
            : editingTag
            ? "Lưu thay đổi"
            : "Thêm thẻ"}
        </button>
      </div>
    </form>
  );
}