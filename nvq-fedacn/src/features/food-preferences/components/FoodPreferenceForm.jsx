import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./FoodPreferenceForm.scss";

export default function FoodPreferenceForm({
  editingFoodPreference,
  onCreate,
  onUpdate,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    ten_so_thich: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingFoodPreference) {
      setFormData({
        ten_so_thich:
          editingFoodPreference.ten_so_thich || "",
      });
    } else {
      setFormData({
        ten_so_thich: "",
      });
    }

    setError("");
  }, [editingFoodPreference]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ten_so_thich.trim()) {
      setError(
        "Vui lòng nhập tên sở thích ẩm thực"
      );
      return;
    }

    try {
      setError("");

      if (editingFoodPreference) {
        await onUpdate(
          editingFoodPreference.ma_so_thich,
          formData
        );
      } else {
        await onCreate(formData);
      }

      setFormData({
        ten_so_thich: "",
      });
    } catch (err) {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <form className="food-form" onSubmit={handleSubmit}>
      <h2>
        {editingFoodPreference
          ? "Cập nhật sở thích ẩm thực"
          : "Thêm sở thích ẩm thực"}
      </h2>

      <div className="food-form__group">
        <input
          type="text"
          placeholder="Tên sở thích ẩm thực"
          value={formData.ten_so_thich}
          onChange={(e) => {
            setFormData({
              ...formData,
              ten_so_thich: e.target.value,
            });

            if (error) {
              setError("");
            }
          }}
          className={error ? "input-error" : ""}
        />

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}
      </div>

      <div className="food-form__actions">
        <button type="submit">
          {editingFoodPreference
            ? "Lưu thay đổi"
            : "Thêm mới"}
        </button>

        {editingFoodPreference && (
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Hủy sửa
          </button>
        )}
      </div>
    </form>
  );
}