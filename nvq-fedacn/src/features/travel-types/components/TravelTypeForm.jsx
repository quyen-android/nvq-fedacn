import {
  useEffect,
  useState,
} from "react";

import "./TravelTypeForm.scss";

export default function TravelTypeForm({
  editingTravelType,
  onCreate,
  onUpdate,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    ten_loai: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTravelType) {
      setFormData({
        ten_loai:
          editingTravelType.ten_loai || "",
      });
    } else {
      setFormData({
        ten_loai: "",
      });
    }

    setError("");
  }, [editingTravelType]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.ten_loai.trim()) {
      setError(
        "Vui lòng nhập tên loại du lịch"
      );
      return;
    }

    try {
      setError("");

      const payload = {
        ten_loai:
          formData.ten_loai.trim(),
      };

      if (editingTravelType) {
        await onUpdate(
          editingTravelType.ma_loai_du_lich,
          payload
        );
      } else {
        await onCreate(payload);
      }

      setFormData({
        ten_loai: "",
      });
    } catch (err) {
      setError(
        err.message || "Có lỗi xảy ra"
      );
    }
  }

  function handleCancel() {
    setFormData({
      ten_loai: "",
    });

    setError("");

    onCancel();
  }

  return (
    <form
      className="travel-type-form"
      onSubmit={handleSubmit}
    >
      <h2>
        {editingTravelType
          ? "Cập nhật loại du lịch"
          : "Thêm loại du lịch"}
      </h2>

      <div className="form-group">
        <label>
          Tên loại du lịch
        </label>

        <input
          type="text"
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
          className={
            error ? "input-error" : ""
          }
          placeholder="Ví dụ: Nghỉ dưỡng, khám phá, gia đình..."
        />

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn-primary"
        >
          {editingTravelType
            ? "Cập nhật"
            : "Thêm mới"}
        </button>

        {editingTravelType && (
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
          >
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}