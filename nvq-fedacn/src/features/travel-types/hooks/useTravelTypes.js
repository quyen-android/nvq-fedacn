import {
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import {
  getTravelTypes,
  createTravelType,
  updateTravelType,
  deleteTravelType,
} from "../services/travelTypeService";

export function useTravelTypes() {
  const [travelTypes, setTravelTypes] =
    useState([]);

  const [editingTravelType, setEditingTravelType] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function loadTravelTypes() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getTravelTypes();

      setTravelTypes(data);

    } catch (err) {
      setError(err.message);

      toast.error(err.message);

    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(payload) {
    try {
      setError("");

      await createTravelType(payload);

      toast.success(
        "Thêm loại du lịch thành công"
      );

      await loadTravelTypes();

    } catch (err) {
      setError(err.message);

      toast.error(err.message);
    }
  }

  async function handleUpdate(
    maLoaiDuLich,
    payload
  ) {
    try {
      setError("");

      await updateTravelType(
        maLoaiDuLich,
        payload
      );

      setEditingTravelType(null);

      toast.success(
        "Cập nhật loại du lịch thành công"
      );

      await loadTravelTypes();

    } catch (err) {
      setError(err.message);

      toast.error(err.message);
    }
  }

  async function handleDelete(
    maLoaiDuLich
  ) {
    const ok = window.confirm(
      "Bạn có chắc muốn xóa loại du lịch này không?"
    );

    if (!ok) return;

    try {
      setError("");

      await deleteTravelType(
        maLoaiDuLich
      );

      toast.success(
        "Xóa loại du lịch thành công"
      );

      await loadTravelTypes();

    } catch (err) {
      setError(err.message);

      toast.error(err.message);
    }
  }

  useEffect(() => {
    loadTravelTypes();
  }, []);

  return {
    travelTypes,
    editingTravelType,
    setEditingTravelType,

    loading,

    handleCreate,
    handleUpdate,
    handleDelete,
  };
}