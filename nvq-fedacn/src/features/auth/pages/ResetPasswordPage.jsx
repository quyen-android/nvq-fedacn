import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function ResetPasswordPage() {
  const { resetPassword, loading, error } = useAuth();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    token,
    new_password: "",
    confirm_password: "",
  });

  const updateField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.new_password !== formData.confirm_password) {
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    await resetPassword(formData);
    setMessage("Đổi mật khẩu thành công. Bạn có thể đăng nhập lại.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[360px] bg-white border border-gray-100 shadow-sm rounded-xl px-7 py-8"
      >
        {/* logo */}
        <div className="flex justify-center mb-5">
          <img
            src="/logo.png"
            alt="TripAI"
            className="h-14 object-contain"
          />
        </div>

        {/* heading */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
            <LockKeyhole size={22} className="text-blue-700" />
          </div>

          <h2 className="text-[30px] font-bold text-gray-900 leading-tight">
            Đặt lại mật khẩu
          </h2>

          <p className="text-sm text-gray-500 mt-2 leading-5">
            Nhập mật khẩu mới cho tài khoản của bạn
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        {message && (
          <p
            className={`text-sm rounded-lg px-3 py-2 mb-4 ${
              message.includes("thành công")
                ? "text-green-600 bg-green-50 border border-green-100"
                : "text-red-500 bg-red-50 border border-red-100"
            }`}
          >
            {message}
          </p>
        )}

        {/* new password */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            Mật khẩu mới
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.new_password}
              onChange={(e) =>
                updateField("new_password", e.target.value)
              }
              className="w-full h-11 border border-gray-200 rounded-lg px-4 pr-11 text-sm outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* confirm password */}
        <div className="mb-5">
          <label className="block text-sm text-gray-700 mb-2">
            Xác nhận mật khẩu
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.confirm_password}
              onChange={(e) =>
                updateField("confirm_password", e.target.value)
              }
              className="w-full h-11 border border-gray-200 rounded-lg px-4 pr-11 text-sm outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium transition disabled:opacity-60"
        >
          {loading ? "Đang đổi..." : "Đổi mật khẩu"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-5">
          Quay lại{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
}