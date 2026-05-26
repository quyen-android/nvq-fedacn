import {
  useEffect,
  useState,
} from "react";

import {
  getTags,
  getPlaceTypes,
  createTag,
  updateTag,
  deleteTag,
} from "../services/tagService";

import { toast } from "react-toastify";

export function useTags() {
  const [tags, setTags] = useState([]);
  const [placeTypes, setPlaceTypes] =
    useState([]);

  const [editingTag, setEditingTag] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  async function loadData() {
    try {
      setLoading(true);

      const [
        tagsData,
        typesData,
      ] = await Promise.all([
        getTags(),
        getPlaceTypes(),
      ]);

      setTags(tagsData);
      setPlaceTypes(typesData);
    } catch (err) {
      toast.error(
        err.message ||
          "Không thể tải dữ liệu"
      );
    } finally {
      setLoading(false);
    }
  }

  async function reloadTags() {
    try {
      const data = await getTags();

      setTags(data);
    } catch (err) {
      toast.error(
        err.message ||
          "Không thể tải danh sách thẻ"
      );
    }
  }

  async function handleCreate(
    payload
  ) {
    try {
      await createTag(payload);

      toast.success(
        "Thêm thẻ thành công"
      );

      await reloadTags();
    } catch (err) {
      toast.error(
        err.message ||
          "Có lỗi xảy ra"
      );
    }
  }

  async function handleUpdate(
    maThe,
    payload
  ) {
    try {
      await updateTag(
        maThe,
        payload
      );

      setEditingTag(null);

      toast.success(
        "Cập nhật thẻ thành công"
      );

      await reloadTags();
    } catch (err) {
      toast.error(
        err.message ||
          "Có lỗi xảy ra"
      );
    }
  }

  async function handleDelete(
    maThe
  ) {
    const ok = window.confirm(
      "Bạn có chắc muốn xóa thẻ này không?"
    );

    if (!ok) return;

    try {
      await deleteTag(maThe);

      toast.success(
        "Xóa thẻ thành công"
      );

      await reloadTags();
    } catch (err) {
      toast.error(
        err.message ||
          "Có lỗi xảy ra"
      );
    }
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

    handleCreate,
    handleUpdate,
    handleDelete,
  };
}