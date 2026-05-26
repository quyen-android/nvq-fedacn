import {
  useEffect,
  useState,
} from "react";

import {
  Tag,
  Layers,
  Save,
  X,
  ChevronDown,
} from "lucide-react";

import "./TagForm.scss";

const INITIAL_FORM = {
  ten_the: "",
  ma_loai: "",
};

const INITIAL_ERROR = {
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

  const [error, setError] =
    useState(INITIAL_ERROR);

  const [loading, setLoading] =
    useState(false);

  const [focusedSelect, setFocusedSelect] =
    useState(false);

  useEffect(() => {
    if (editingTag) {
      setFormData({
        ten_the: editingTag.ten_the || "",
        ma_loai: editingTag.ma_loai || "",
      });
    } else {
      setFormData(INITIAL_FORM);
    }

    setError(INITIAL_ERROR);
  }, [editingTag]);

  const updateField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newError = {
      ten_the: "",
      ma_loai: "",
    };

    let isValid = true;

    if (!formData.ten_the.trim()) {
      newError.ten_the =
        "Vui lòng nhập tên thẻ";
      isValid = false;
    }

    if (!formData.ma_loai) {
      newError.ma_loai =
        "Vui lòng chọn loại địa điểm";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        ...formData,
        ten_the: formData.ten_the.trim(),
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

      setError(INITIAL_ERROR);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(INITIAL_FORM);
    setError(INITIAL_ERROR);
    onCancel();
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

          <div
            className={`tag-form__input-wrap ${
              error.ten_the
                ? "tag-form__input-wrap--error"
                : ""
            }`}
          >
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

          {error.ten_the && (
            <p className="tag-form__error">
              {error.ten_the}
            </p>
          )}
        </div>

        <div className="tag-form__group">
          <label>Loại địa điểm</label>

          <div
            className={`tag-form__input-wrap tag-form__input-wrap--select ${
              focusedSelect
                ? "tag-form__input-wrap--active"
                : ""
            } ${
              error.ma_loai
                ? "tag-form__input-wrap--error"
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

          {error.ma_loai && (
            <p className="tag-form__error">
              {error.ma_loai}
            </p>
          )}
        </div>
      </div>

      <div className="tag-form__actions">
        {editingTag && (
          <button
            type="button"
            className="tag-form__btn tag-form__btn--secondary"
            onClick={handleCancel}
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