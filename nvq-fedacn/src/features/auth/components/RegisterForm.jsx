import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function RegisterForm() {
  const { register, loading, error } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    register({
      ten_nguoi_dung: fullName,
      email: email,
      mat_khau: password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[360px] bg-white border border-gray-100 shadow-sm rounded-xl px-7 py-7"
      >
        {/* logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/logo.png"
            alt="TripAI"
            className="h-14 object-contain"
          />
        </div>

        {/* heading */}
        <div className="text-center mb-5">
          <h2 className="text-[30px] font-bold text-gray-900 leading-tight">
            Tạo tài khoản
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Đăng ký để bắt đầu lập kế hoạch chuyến đi
          </p>
        </div>

        {/* full name */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            Họ và tên
          </label>

          <input
            type="text"
            placeholder="Nhập họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full h-11 border border-gray-200 rounded-lg px-4 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            Địa chỉ Email
          </label>

          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 border border-gray-200 rounded-lg px-4 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* password */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">
            Mật khẩu
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

        {/* register button */}
        <button
          type="submit"
          className="w-full h-11 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium transition"
        >
          Đăng ký
        </button>

        {/* login link */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Đã có tài khoản?{" "}
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