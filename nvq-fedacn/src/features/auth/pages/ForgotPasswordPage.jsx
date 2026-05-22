import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function ForgotPasswordPage() {
  const { forgotPassword, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await forgotPassword(email);

    if (success) {
      setMessage(
        "Nếu email tồn tại, hệ thống đã gửi link đặt lại mật khẩu."
      );
    }
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
          <h2 className="text-[30px] font-bold text-gray-900 leading-tight">
            Quên mật khẩu
          </h2>

          <p className="text-sm text-gray-500 mt-2 leading-5">
            Nhập email của bạn để nhận link đặt lại mật khẩu
          </p>
        </div>

        {/* error */}
        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        {/* message */}
        {message && (
          <p className="text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg px-3 py-2 mb-4">
            {message}
          </p>
        )}

        {/* email */}
        <div className="mb-5">
          <label className="block text-sm text-gray-700 mb-2">
            Địa chỉ Email
          </label>

          <div className="relative">
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 border border-gray-200 rounded-lg px-4 pr-11 text-sm outline-none focus:border-blue-500"
            />

            <Mail
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium transition disabled:opacity-60"
        >
          {loading ? "Đang gửi..." : "Gửi link đặt lại mật khẩu"}
        </button>

        {/* back login */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Nhớ mật khẩu rồi?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </form>
    </div>
  );
}