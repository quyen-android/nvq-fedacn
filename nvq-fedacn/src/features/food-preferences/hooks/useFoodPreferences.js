import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import {
  getFoodPreferences,
  createFoodPreference,
  updateFoodPreference,
  deleteFoodPreference,
} from "../services/foodPreferenceService";

export function useFoodPreferences() {
  const [foodPreferences, setFoodPreferences] = useState([]);
  const [editingFoodPreference, setEditingFoodPreference] = useState(null);

  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  async function loadFoodPreferences() {
    try {
      setLoading(true);

      const data = await getFoodPreferences();

      setFoodPreferences(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(payload) {
    try {
      await createFoodPreference(payload);

      toast.success("Thêm sở thích ẩm thực thành công");
      await loadFoodPreferences();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleUpdate(maSoThich, payload) {
    try {
      await updateFoodPreference(maSoThich, payload);

      toast.success("Cập nhật sở thích ẩm thực thành công");
      setEditingFoodPreference(null);

      await loadFoodPreferences();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete(maSoThich) {
    const ok = window.confirm("Bạn có chắc muốn xóa sở thích ẩm thực này không?");
    if (!ok) return;

    try {
      await deleteFoodPreference(maSoThich);

      toast.success("Xóa sở thích ẩm thực thành công");
      await loadFoodPreferences();
    } catch (err) {
      toast.error(err.message);
    }
  }

  const filteredFoodPreferences = useMemo(() => {
    return [...foodPreferences]
      .filter((item) =>
        item.ten_so_thich
          ?.toLowerCase()
          .includes(keyword.toLowerCase())
      )
      .sort((a, b) => {
        const nameA = a.ten_so_thich?.toLowerCase() || "";
        const nameB = b.ten_so_thich?.toLowerCase() || "";

        if (sortOrder === "asc") {
          return nameA.localeCompare(nameB);
        }

        return nameB.localeCompare(nameA);
      });
  }, [foodPreferences, keyword, sortOrder]);

  useEffect(() => {
    loadFoodPreferences();
  }, []);

  return {
    foodPreferences: filteredFoodPreferences,
    editingFoodPreference,
    setEditingFoodPreference,

    loading,
    keyword,
    setKeyword,
    sortOrder,
    setSortOrder,

    handleCreate,
    handleUpdate,
    handleDelete,
  };
}