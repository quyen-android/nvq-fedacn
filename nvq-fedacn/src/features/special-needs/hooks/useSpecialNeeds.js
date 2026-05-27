import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import {
  getSpecialNeeds,
  createSpecialNeed,
  updateSpecialNeed,
  deleteSpecialNeed,
} from "../services/specialNeedService";

export function useSpecialNeeds() {
  const [specialNeeds, setSpecialNeeds] = useState([]);
  const [editingSpecialNeed, setEditingSpecialNeed] = useState(null);

  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  async function loadSpecialNeeds() {
    try {
      setLoading(true);
      const data = await getSpecialNeeds();
      setSpecialNeeds(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(payload) {
    try {
      await createSpecialNeed(payload);
      toast.success("Thêm yêu cầu đặc biệt thành công");
      await loadSpecialNeeds();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleUpdate(maYeuCau, payload) {
    try {
      await updateSpecialNeed(maYeuCau, payload);
      toast.success("Cập nhật yêu cầu đặc biệt thành công");
      setEditingSpecialNeed(null);
      await loadSpecialNeeds();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete(maYeuCau) {
    const ok = window.confirm("Bạn có chắc muốn xóa yêu cầu đặc biệt này không?");
    if (!ok) return;

    try {
      await deleteSpecialNeed(maYeuCau);
      toast.success("Xóa yêu cầu đặc biệt thành công");
      await loadSpecialNeeds();
    } catch (err) {
      toast.error(err.message);
    }
  }

  function toggleSortOrder() {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }

  const filteredSpecialNeeds = useMemo(() => {
    return [...specialNeeds]
      .filter((item) =>
        item.ten_yeu_cau
          ?.toLowerCase()
          .includes(keyword.toLowerCase())
      )
      .sort((a, b) => {
        const nameA = a.ten_yeu_cau?.toLowerCase() || "";
        const nameB = b.ten_yeu_cau?.toLowerCase() || "";

        if (sortOrder === "asc") {
          return nameA.localeCompare(nameB);
        }

        return nameB.localeCompare(nameA);
      });
  }, [specialNeeds, keyword, sortOrder]);

  useEffect(() => {
    loadSpecialNeeds();
  }, []);

  return {
    specialNeeds: filteredSpecialNeeds,
    editingSpecialNeed,
    setEditingSpecialNeed,

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