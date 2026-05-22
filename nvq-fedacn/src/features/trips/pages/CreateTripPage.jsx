import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useTripForm } from "../hooks/useTripForm";

import {
  createTrip,
  getTripOptions,
} from "../services/tripService";

import TripBasicForm from "../components/TripBasicForm";
import TripPersonalization from "../components/TripPersonalization";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import "./CreateTripPage.scss";

export default function CreateTripPage() {
  const navigate = useNavigate();

  const {
    formData,
    updateField,
    toggleArrayValue,
  } = useTripForm();

  const [step, setStep] = useState(1);

  const [options, setOptions] = useState({
    tinhs: [],
    phuong_tiens: [],
    loai_du_lichs: [],
    so_thichs: [],
    yeu_caus: [],
  });

  const [loadingOptions, setLoadingOptions] =
    useState(true);

  const [loadingSubmit, setLoadingSubmit] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOptions() {
      try {
        setLoadingOptions(true);

        const result = await getTripOptions();

        setOptions(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingOptions(false);
      }
    }

    fetchOptions();
  }, []);

  const validateForm = () => {
    if (!formData.ten_chuyen_di?.trim()) {
      return "Vui lòng nhập tên chuyến đi.";
    }

    if (!formData.ma_tinh_di) {
      return "Vui lòng chọn tỉnh/thành phố đi.";
    }

    if (!formData.ma_tinh_den) {
      return "Vui lòng chọn tỉnh/thành phố đến.";
    }

    if (!formData.ma_pt) {
      return "Vui lòng chọn phương tiện di chuyển.";
    }

    if (!formData.ngay_di) {
      return "Vui lòng chọn ngày đi.";
    }

    if (!formData.ngay_ve) {
      return "Vui lòng chọn ngày về.";
    }

    if (!formData.so_nguoi || Number(formData.so_nguoi) <= 0) {
      return "Vui lòng nhập số người.";
    }

    if (!formData.ngan_sach || Number(formData.ngan_sach) <= 0) {
      return "Vui lòng nhập ngân sách.";
    }

    if (
      !formData.loai_du_lich_ids ||
      formData.loai_du_lich_ids.length === 0
    ) {
      return "Vui lòng chọn ít nhất 1 loại du lịch.";
    }

    return null;
  };

  const handleSubmit = async () => {
    try {
      setError("");

      const validationError = validateForm();

      if (validationError) {
        setError(validationError);
        return;
      }

      setLoadingSubmit(true);

      const payload = {
        ...formData,
        so_nguoi: Number(formData.so_nguoi),
        ngan_sach: Number(formData.ngan_sach),
      };

      const result = await createTrip(payload);

      navigate(`/itinerary/${result.ma_chuyen_di}`);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
        err.message ||
        "Có lỗi xảy ra."
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="create-trip-page">
        {/* hero */}
        <div className="create-trip-hero">
          <div className="create-trip-hero__badge">
            <Sparkles size={16} />
            AI Travel Planner
          </div>

          <h2>
            Tạo chuyến đi thông minh
          </h2>

          <p>
            Cá nhân hóa chuyến đi của bạn và để AI tạo
            lịch trình phù hợp nhất.
          </p>
        </div>

        {/* error */}
        {error && (
          <div className="create-trip-error">
            {error}
          </div>
        )}

        {/* loading */}
        {loadingOptions ? (
          <div className="create-trip-loading">
            <div className="loader"></div>

            <p>Đang tải dữ liệu...</p>
          </div>
        ) : (
          <>
            {step === 1 && (
              <TripBasicForm
                formData={formData}
                updateField={updateField}
                options={options}
                onNext={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <TripPersonalization
                formData={formData}
                toggleArrayValue={toggleArrayValue}
                options={options}
                onBack={() => setStep(1)}
                onSubmit={handleSubmit}
                loading={loadingSubmit}
              />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}