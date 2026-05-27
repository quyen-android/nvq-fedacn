import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Country,
  State,
} from "country-state-city";

import { toast } from "react-toastify";

import { getCoordinates } from "../services/provinceService";

import "./ProvinceForm.scss";

export default function ProvinceForm({
  editingProvince,
  onCreate,
  onUpdate,
  onCancel,
}) {
  const countries = useMemo(
    () => Country.getAllCountries(),
    []
  );

  const [
    selectedCountryCode,
    setSelectedCountryCode,
  ] = useState("VN");

  const states = useMemo(() => {
    return State.getStatesOfCountry(
      selectedCountryCode
    );
  }, [selectedCountryCode]);

  const [formData, setFormData] =
    useState({
      ten_tinh: "",
      quoc_gia: "Vietnam",
      kinh_do: "",
      vi_do: "",
    });

  /*
    Khi bấm sửa:
    1. set country trước
    2. rồi mới fill form
  */
  useEffect(() => {
    if (!editingProvince) {
      setSelectedCountryCode("VN");

      setFormData({
        ten_tinh: "",
        quoc_gia: "Vietnam",
        kinh_do: "",
        vi_do: "",
      });

      return;
    }

    const country = countries.find(
      (item) =>
        item.name ===
        editingProvince.quoc_gia
    );

    setSelectedCountryCode(
      country?.isoCode || "VN"
    );
  }, [editingProvince, countries]);

  /*
    Đợi country đổi xong
    rồi mới set dữ liệu form
  */
  useEffect(() => {
    if (!editingProvince) return;

    setFormData({
      ten_tinh:
        editingProvince.ten_tinh || "",

      quoc_gia:
        editingProvince.quoc_gia || "",

      kinh_do:
        editingProvince.kinh_do || "",

      vi_do:
        editingProvince.vi_do || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [
    editingProvince,
    selectedCountryCode,
  ]);

  function updateField(name, value) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCountryChange(e) {
    const isoCode = e.target.value;

    const country = countries.find(
      (item) =>
        item.isoCode === isoCode
    );

    setSelectedCountryCode(
      isoCode
    );

    setFormData((prev) => ({
      ...prev,
      quoc_gia:
        country?.name || "",

      ten_tinh: "",
      kinh_do: "",
      vi_do: "",
    }));
  }

  async function handleGetCoordinates() {
    if (
      !formData.ten_tinh ||
      !formData.quoc_gia
    ) {
      toast.error(
        "Vui lòng chọn quốc gia và tỉnh"
      );

      return;
    }

    try {
      const query =
        `${formData.ten_tinh}, ${formData.quoc_gia}`;

      const data =
        await getCoordinates(query);

      setFormData((prev) => ({
        ...prev,
        kinh_do: data.kinh_do,
        vi_do: data.vi_do,
      }));

      toast.success(
        "Lấy tọa độ thành công"
      );
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.ten_tinh.trim()
    ) {
      toast.error(
        "Vui lòng chọn tỉnh"
      );
      return;
    }

    if (
      !formData.quoc_gia.trim()
    ) {
      toast.error(
        "Vui lòng chọn quốc gia"
      );
      return;
    }

    if (
      formData.kinh_do === "" ||
      formData.vi_do === ""
    ) {
      toast.error(
        "Vui lòng lấy kinh độ, vĩ độ"
      );
      return;
    }

    const payload = {
      ten_tinh:
        formData.ten_tinh,

      quoc_gia:
        formData.quoc_gia,

      kinh_do: Number(
        formData.kinh_do
      ),

      vi_do: Number(
        formData.vi_do
      ),
    };

    if (editingProvince) {
      await onUpdate(
        editingProvince.ma_tinh,
        payload
      );
    } else {
      await onCreate(payload);
    }

    setSelectedCountryCode("VN");

    setFormData({
      ten_tinh: "",
      quoc_gia: "Vietnam",
      kinh_do: "",
      vi_do: "",
    });
  }

  return (
    <form
      className="province-form"
      onSubmit={handleSubmit}
    >
      <h2>
        {editingProvince
          ? "Cập nhật tỉnh"
          : "Thêm tỉnh"}
      </h2>

      <div className="province-form__grid">
        <div className="province-form__group">
          <label>Quốc gia</label>

          <select
            value={
              selectedCountryCode
            }
            onChange={
              handleCountryChange
            }
          >
            <option value="">
              Chọn quốc gia
            </option>

            {countries.map(
              (country) => (
                <option
                  key={
                    country.isoCode
                  }
                  value={
                    country.isoCode
                  }
                >
                  {country.name}
                </option>
              )
            )}
          </select>
        </div>

        <div className="province-form__group">
          <label>
            Tỉnh / bang / thành phố
          </label>

          <select
            value={
              formData.ten_tinh
            }
            onChange={(e) => {
              updateField(
                "ten_tinh",
                e.target.value
              );

              updateField(
                "kinh_do",
                ""
              );

              updateField(
                "vi_do",
                ""
              );
            }}
          >
            <option value="">
              Chọn tỉnh / bang /
              thành phố
            </option>

            {states.map(
              (state) => (
                <option
                  key={
                    state.isoCode
                  }
                  value={
                    state.name
                  }
                >
                  {state.name}
                </option>
              )
            )}
          </select>
        </div>

        <div className="province-form__group">
          <label>
            Kinh độ
          </label>

          <input
            type="number"
            step="any"
            placeholder="Kinh độ"
            value={
              formData.kinh_do
            }
            onChange={(e) =>
              updateField(
                "kinh_do",
                e.target.value
              )
            }
          />
        </div>

        <div className="province-form__group">
          <label>
            Vĩ độ
          </label>

          <input
            type="number"
            step="any"
            placeholder="Vĩ độ"
            value={
              formData.vi_do
            }
            onChange={(e) =>
              updateField(
                "vi_do",
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div className="province-form__actions">
        <button
          type="button"
          className="province-form__btn-coordinate"
          onClick={
            handleGetCoordinates
          }
        >
          Lấy tọa độ
        </button>

        <button
          type="submit"
          className="province-form__btn-primary"
        >
          {editingProvince
            ? "Lưu thay đổi"
            : "Thêm tỉnh"}
        </button>

        {editingProvince && (
          <button
            type="button"
            className="province-form__btn-secondary"
            onClick={onCancel}
          >
            Hủy sửa
          </button>
        )}
      </div>
    </form>
  );
}