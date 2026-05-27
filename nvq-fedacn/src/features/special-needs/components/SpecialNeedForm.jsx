import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./SpecialNeedForm.scss";

export default function SpecialNeedForm({
  editingSpecialNeed,
  onCreate,
  onUpdate,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    ten_yeu_cau: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingSpecialNeed) {
      setFormData({
        ten_yeu_cau: editingSpecialNeed.ten_yeu_cau || "",
      });
    } else {
      setFormData({
        ten_yeu_cau: "",
      });
    }

    setError("");
  }, [editingSpecialNeed]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ten_yeu_cau.trim()) {
      setError("Vui lòng nhập tên yêu cầu đặc biệt");
      return;
    }

    try {
      setError("");

      if (editingSpecialNeed) {
        await onUpdate(
          editingSpecialNeed.ma_yeu_cau,
          formData
        );
      } else {
        await onCreate(formData);
      }

      setFormData({
        ten_yeu_cau: "",
      });
    } catch (err) {
      toast.error(err.message || "Có lỗi xảy ra");
    }
  };

  return (
    <form
      className="special-need-form"
      onSubmit={handleSubmit}
    >
      <h2>
        {editingSpecialNeed
          ? "Cập nhật yêu cầu đặc biệt"
          : "Thêm yêu cầu đặc biệt"}
      </h2>

      <div className="special-need-form__group">
        <input
          type="text"
          placeholder="Tên yêu cầu đặc biệt"
          value={formData.ten_yeu_cau}
          className={error ? "input-error" : ""}
          onChange={(e) => {
            setFormData({
              ...formData,
              ten_yeu_cau: e.target.value,
            });

            if (error) {
              setError("");
            }
          }}
        />

        {error && (
          <p className="special-need-form__error">
            {error}
          </p>
        )}
      </div>

      <div className="special-need-form__actions">
        <button type="submit" className="btn-primary">
          {editingSpecialNeed ? "Lưu thay đổi" : "Thêm mới"}
        </button>

        {editingSpecialNeed && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
          >
            Hủy sửa
          </button>
        )}
      </div>
    </form>
  );
}