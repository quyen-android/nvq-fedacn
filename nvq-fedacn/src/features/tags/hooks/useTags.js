import { useEffect, useState } from "react";
import {
  getTags,
  getPlaceTypes,
  createTag,
  updateTag,
  deleteTag,
} from "../services/tagService";

export function useTags() {
  const [tags, setTags] = useState([]);
  const [placeTypes, setPlaceTypes] = useState([]);
  const [editingTag, setEditingTag] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [tagsData, typesData] = await Promise.all([
        getTags(),
        getPlaceTypes(),
      ]);

      setTags(tagsData);
      setPlaceTypes(typesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(payload) {
    await createTag(payload);
    await loadData();
  }

  async function handleUpdate(maThe, payload) {
    await updateTag(maThe, payload);
    setEditingTag(null);
    await loadData();
  }

  async function handleDelete(maThe) {
    const ok = window.confirm("Bạn có chắc muốn xóa thẻ này không?");
    if (!ok) return;

    await deleteTag(maThe);
    await loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return {
    tags,
    placeTypes,
    editingTag,
    setEditingTag,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}