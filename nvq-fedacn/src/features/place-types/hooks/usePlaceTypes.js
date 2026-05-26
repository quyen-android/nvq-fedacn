import {
  useEffect,
  useState,
} from "react";

import {
  getPlaceTypes,
  createPlaceType,
  updatePlaceType,
  deletePlaceType,
} from "../services/placeTypeService";

import { toast } from "react-toastify";

export function usePlaceTypes() {
  const [placeTypes, setPlaceTypes] =
    useState([]);

  const [
    editingPlaceType,
    setEditingPlaceType,
  ] = useState(null);

  const [loading, setLoading] =
    useState(false);

  async function loadPlaceTypes() {
    try {
      setLoading(true);

      const data =
        await getPlaceTypes();

      setPlaceTypes(data);
    } catch (err) {
      toast.error(
        err.message ||
          "Không thể tải loại địa điểm"
      );
    } finally {
      setLoading(false);
    }
  }

  async function reloadPlaceTypes() {
    try {
      const data =
        await getPlaceTypes();

      setPlaceTypes(data);
    } catch (err) {
      toast.error(
        err.message ||
          "Không thể tải dữ liệu"
      );
    }
  }

  async function handleCreate(
    payload
  ) {
    try {
      await createPlaceType(
        payload
      );

      toast.success(
        "Thêm loại địa điểm thành công"
      );

      await reloadPlaceTypes();
    } catch (err) {
      toast.error(
        err.message ||
          "Có lỗi xảy ra"
      );
    }
  }

  async function handleUpdate(
    maLoai,
    payload
  ) {
    try {
      await updatePlaceType(
        maLoai,
        payload
      );

      setEditingPlaceType(null);

      toast.success(
        "Cập nhật loại địa điểm thành công"
      );

      await reloadPlaceTypes();
    } catch (err) {
      toast.error(
        err.message ||
          "Có lỗi xảy ra"
      );
    }
  }

  async function handleDelete(
    maLoai
  ) {
    const ok = window.confirm(
      "Bạn có chắc muốn xóa loại địa điểm này không?"
    );

    if (!ok) return;

    try {
      await deletePlaceType(
        maLoai
      );

      toast.success(
        "Xóa loại địa điểm thành công"
      );

      await reloadPlaceTypes();
    } catch (err) {
      toast.error(
        err.message ||
          "Có lỗi xảy ra"
      );
    }
  }

  useEffect(() => {
    loadPlaceTypes();
  }, []);

  return {
    placeTypes,
    editingPlaceType,
    setEditingPlaceType,
    loading,

    handleCreate,
    handleUpdate,
    handleDelete,
  };
}