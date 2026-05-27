import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./PlaceForm.scss"
export default function PlaceForm({
  provinces,
  placeTypes,
  editingPlace,
  onCreate,
  onUpdate,
  onCancel,
}) {
  const emptyForm = {
    ten: "",
    ma_tinh: "",
    ma_loai: "",
    dia_chi: "",
    mo_ta: "",
    kinh_do: "",
    vi_do: "",
    gia_trung_binh: "",
    gio_mo: "",
    gio_dong: "",
    website: "",
    sdt: "",
    anh_chinh: null,
    anh_phu: [],
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingPlace) {
      setFormData({
        ten: editingPlace.ten || "",
        ma_tinh: editingPlace.ma_tinh || "",
        ma_loai: editingPlace.ma_loai || "",
        dia_chi: editingPlace.dia_chi || "",
        mo_ta: editingPlace.mo_ta || "",
        kinh_do: editingPlace.kinh_do || "",
        vi_do: editingPlace.vi_do || "",
        gia_trung_binh: editingPlace.gia_trung_binh || "",
        gio_mo: editingPlace.gio_mo || "",
        gio_dong: editingPlace.gio_dong || "",
        website: editingPlace.website || "",
        sdt: editingPlace.sdt || "",
        anh_chinh: null,
        anh_phu: [],
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingPlace]);

  function updateField(name, value) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.ten.trim()) {
      toast.error("Vui lòng nhập tên địa điểm");
      return;
    }

    if (!formData.ma_tinh) {
      toast.error("Vui lòng chọn tỉnh");
      return;
    }

    if (!formData.ma_loai) {
      toast.error("Vui lòng chọn loại địa điểm");
      return;
    }

    if (!editingPlace && !formData.anh_chinh) {
      toast.error("Vui lòng chọn ảnh chính");
      return;
    }

    const payload = {
      ...formData,
      kinh_do:
        formData.kinh_do === "" ? "" : Number(formData.kinh_do),
      vi_do:
        formData.vi_do === "" ? "" : Number(formData.vi_do),
      gia_trung_binh:
        formData.gia_trung_binh === ""
          ? ""
          : Number(formData.gia_trung_binh),
    };

    if (editingPlace) {
      await onUpdate(editingPlace.ma_dia_diem, payload);
    } else {
      await onCreate(payload);
    }

    setFormData(emptyForm);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingPlace ? "Cập nhật địa điểm" : "Thêm địa điểm"}</h2>

      <input
        type="text"
        placeholder="Tên địa điểm"
        value={formData.ten}
        onChange={(e) => updateField("ten", e.target.value)}
      />

      <select
        value={formData.ma_tinh}
        onChange={(e) => updateField("ma_tinh", e.target.value)}
      >
        <option value="">Chọn tỉnh</option>
        {provinces.map((item) => (
          <option key={item.ma_tinh} value={item.ma_tinh}>
            {item.ten_tinh}
          </option>
        ))}
      </select>

      <select
        value={formData.ma_loai}
        onChange={(e) => updateField("ma_loai", e.target.value)}
      >
        <option value="">Chọn loại địa điểm</option>
        {placeTypes.map((item) => (
          <option key={item.ma_loai} value={item.ma_loai}>
            {item.ten_loai}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Địa chỉ"
        value={formData.dia_chi}
        onChange={(e) => updateField("dia_chi", e.target.value)}
      />

      <textarea
        placeholder="Mô tả"
        value={formData.mo_ta}
        onChange={(e) => updateField("mo_ta", e.target.value)}
      />

      <input
        type="number"
        step="any"
        placeholder="Kinh độ"
        value={formData.kinh_do}
        onChange={(e) => updateField("kinh_do", e.target.value)}
      />

      <input
        type="number"
        step="any"
        placeholder="Vĩ độ"
        value={formData.vi_do}
        onChange={(e) => updateField("vi_do", e.target.value)}
      />

      <input
        type="number"
        placeholder="Giá trung bình"
        value={formData.gia_trung_binh}
        onChange={(e) => updateField("gia_trung_binh", e.target.value)}
      />

      <input
        type="time"
        value={formData.gio_mo}
        onChange={(e) => updateField("gio_mo", e.target.value)}
      />

      <input
        type="time"
        value={formData.gio_dong}
        onChange={(e) => updateField("gio_dong", e.target.value)}
      />

      <input
        type="text"
        placeholder="Website"
        value={formData.website}
        onChange={(e) => updateField("website", e.target.value)}
      />

      <input
        type="text"
        placeholder="Số điện thoại"
        value={formData.sdt}
        onChange={(e) => updateField("sdt", e.target.value)}
      />

      <div>
        <label>Ảnh chính</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            updateField("anh_chinh", e.target.files?.[0] || null)
          }
        />
      </div>

      <div>
        <label>Ảnh phụ</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) =>
            updateField("anh_phu", Array.from(e.target.files || []))
          }
        />

        {formData.anh_phu.length > 0 && (
          <ul>
            {formData.anh_phu.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit">
        {editingPlace ? "Lưu thay đổi" : "Thêm địa điểm"}
      </button>

      {editingPlace && (
        <button type="button" onClick={onCancel}>
          Hủy sửa
        </button>
      )}
    </form>
  );
}