import { useEffect, useState } from "react";

import {
  getPlaceTypes,
  createPlaceType,
  updatePlaceType,
  deletePlaceType,
} from "../services/placeTypeService";

export function usePlaceTypes() {
  const [placeTypes, setPlaceTypes] = useState([]);
  const [editingPlaceType, setEditingPlaceType] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadPlaceTypes() {
    try {
      setLoading(true);
      setError("");

      const data = await getPlaceTypes();
      setPlaceTypes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(payload) {
    try {
      setError("");

      await createPlaceType(payload);
      await loadPlaceTypes();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdate(
    maLoai,
    payload
  ) {
    try {
      setError("");

      await updatePlaceType(
        maLoai,
        payload
      );

      setEditingPlaceType(null);

      await loadPlaceTypes();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(maLoai) {
    const ok = window.confirm(
      "Bạn có chắc muốn xóa loại địa điểm này không?"
    );

    if (!ok) return;

    try {
      setError("");

      await deletePlaceType(maLoai);

      await loadPlaceTypes();
    } catch (err) {
      setError(err.message);
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
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}