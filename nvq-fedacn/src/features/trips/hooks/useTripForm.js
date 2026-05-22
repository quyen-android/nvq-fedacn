import { useState } from "react";

export function useTripForm() {
  const [formData, setFormData] = useState({
    ten_chuyen_di: "",
    ma_tinh_di: "",
    ma_tinh_den: "",
    ma_pt: "",
    ngay_di: "",
    ngay_ve: "",
    so_nguoi: 1,
    ngan_sach: 0,

    loai_du_lich_ids: [],
    so_thich_ids: [],
    yeu_cau_ids: [],
  });

  const updateField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleArrayValue = (name, value) => {
    setFormData((prev) => {
      const currentValues = prev[name] || [];

      const exists = currentValues.includes(value);

      return {
        ...prev,
        [name]: exists
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  return {
    formData,
    updateField,
    toggleArrayValue,
  };
}