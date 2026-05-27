import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "react-toastify";

import {
  getPlaces,
  getProvinces,
  getPlaceTypes,
  createPlace,
  updatePlace,
  deletePlace,
} from "../services/placeService";

export function usePlaces() {

  const [places, setPlaces] = useState([]);
  const [provinces, setProvinces] =
    useState([]);

  const [placeTypes, setPlaceTypes] =
    useState([]);

  const [editingPlace, setEditingPlace] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [keyword, setKeyword] =
    useState("");

  const [sortOrder, setSortOrder] =
    useState("asc");

  // =========================
  // LOAD DATA
  // =========================
  async function loadData() {

    try {

      setLoading(true);

      const [
        placesData,
        provincesData,
        typesData,
      ] = await Promise.all([
        getPlaces(),
        getProvinces(),
        getPlaceTypes(),
      ]);

      setPlaces(
        Array.isArray(placesData)
          ? placesData
          : []
      );

      setProvinces(
        Array.isArray(provincesData)
          ? provincesData
          : []
      );

      setPlaceTypes(
        Array.isArray(typesData)
          ? typesData
          : []
      );

    } catch (err) {

      toast.error(
        err.message ||
        "Không thể tải dữ liệu"
      );

    } finally {

      setLoading(false);

    }
  }

  // =========================
  // CREATE
  // =========================
  async function handleCreate(payload) {

    try {

      await createPlace(payload);

      toast.success(
        "Thêm địa điểm thành công"
      );

      await loadData();

    } catch (err) {

      toast.error(
        err.message ||
        "Thêm địa điểm thất bại"
      );

    }
  }

  // =========================
  // UPDATE
  // =========================
  async function handleUpdate(
    id,
    payload
  ) {

    try {

      await updatePlace(
        id,
        payload
      );

      toast.success(
        "Cập nhật địa điểm thành công"
      );

      setEditingPlace(null);

      await loadData();

    } catch (err) {

      toast.error(
        err.message ||
        "Cập nhật địa điểm thất bại"
      );

    }
  }

  // =========================
  // DELETE
  // =========================
  async function handleDelete(id) {

    const ok = window.confirm(
      "Bạn có chắc muốn xóa địa điểm này không?"
    );

    if (!ok) return;

    try {

      await deletePlace(id);

      toast.success(
        "Xóa địa điểm thành công"
      );

      if (
        editingPlace?.ma_dia_diem === id
      ) {
        setEditingPlace(null);
      }

      await loadData();

    } catch (err) {

      toast.error(
        err.message ||
        "Xóa địa điểm thất bại"
      );

    }
  }

  // =========================
  // SORT
  // =========================
  function toggleSortOrder() {

    setSortOrder((prev) =>
      prev === "asc"
        ? "desc"
        : "asc"
    );
  }

  // =========================
  // FILTER
  // =========================
  const filteredPlaces = useMemo(() => {

    let filtered = [...places];

    // search
    filtered = filtered.filter((item) => {

      const name =
        item?.ten?.toLowerCase() || "";

      return name.includes(
        keyword.toLowerCase()
      );
    });

    // sort
    filtered.sort((a, b) => {

      const nameA =
        a?.ten || "";

      const nameB =
        b?.ten || "";

      return sortOrder === "asc"
        ? nameA.localeCompare(
            nameB,
            "vi"
          )
        : nameB.localeCompare(
            nameA,
            "vi"
          );
    });

    return filtered;

  }, [
    places,
    keyword,
    sortOrder,
  ]);

  // =========================
  // INIT
  // =========================
  useEffect(() => {

    loadData();

  }, []);

  return {

    // data
    places: filteredPlaces,
    provinces,
    placeTypes,

    // edit
    editingPlace,
    setEditingPlace,

    // loading
    loading,

    // search
    keyword,
    setKeyword,

    // sort
    sortOrder,
    toggleSortOrder,

    // action
    handleCreate,
    handleUpdate,
    handleDelete,

    // reload
    loadData,
  };
}