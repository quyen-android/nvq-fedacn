import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "react-toastify";

import {
  getProvinces,
  createProvince,
  updateProvince,
  deleteProvince,
} from "../services/provinceService";

export function useProvinces() {
  const [provinces, setProvinces] =
    useState([]);

  const [
    editingProvince,
    setEditingProvince,
  ] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [keyword, setKeyword] =
    useState("");

  const [sortOrder, setSortOrder] =
    useState("asc");

  function toggleSortOrder() {
    setSortOrder((prev) =>
      prev === "asc"
        ? "desc"
        : "asc"
    );
  }

  async function loadProvinces() {
    try {
      setLoading(true);

      const data =
        await getProvinces();

      setProvinces(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProvinces();
  }, []);

  async function handleCreate(payload) {
    try {
      await createProvince(payload);

      toast.success(
        "Thêm tỉnh thành công"
      );

      await loadProvinces();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleUpdate(
    maTinh,
    payload
  ) {
    try {
      await updateProvince(
        maTinh,
        payload
      );

      toast.success(
        "Cập nhật tỉnh thành công"
      );

      setEditingProvince(null);

      await loadProvinces();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete(maTinh) {
    const ok = window.confirm(
      "Bạn có chắc muốn xóa tỉnh này không?"
    );

    if (!ok) return;

    try {
      await deleteProvince(maTinh);

      toast.success(
        "Xóa tỉnh thành công"
      );

      await loadProvinces();
    } catch (err) {
      toast.error(err.message);
    }
  }

  const filteredProvinces =
    useMemo(() => {
      let filtered =
        provinces.filter((item) =>
          item.ten_tinh
            ?.toLowerCase()
            .includes(
              keyword.toLowerCase()
            )
        );

      filtered.sort((a, b) =>
        sortOrder === "asc"
          ? a.ten_tinh.localeCompare(
              b.ten_tinh,
              "vi"
            )
          : b.ten_tinh.localeCompare(
              a.ten_tinh,
              "vi"
            )
      );

      return filtered;
    }, [
      provinces,
      keyword,
      sortOrder,
    ]);

  return {
    provinces,
    filteredProvinces,

    editingProvince,
    setEditingProvince,

    loading,

    keyword,
    setKeyword,

    sortOrder,
    toggleSortOrder,

    handleCreate,
    handleUpdate,
    handleDelete,
  };
}