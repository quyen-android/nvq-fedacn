import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const { login, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
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
          <h2 className="text-[32px] font-bold text-gray-900 leading-tight">
            Chào mừng trở lại
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Nhập thông tin của bạn để bắt đầu lập kế hoạch
          </p>
        </div>

        {/* error */}
        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

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
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-700">Mật khẩu</label>

            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

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

        {/* remember */}
        <div className="flex items-center gap-2 mb-5">
          <input type="checkbox" className="w-4 h-4" />

          <span className="text-sm text-gray-500">
            Ghi nhớ đăng nhập
          </span>
        </div>

        {/* login */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium transition"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        {/* divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />

          <span className="text-xs text-gray-400 whitespace-nowrap">
            HOẶC TIẾP TỤC VỚI
          </span>

          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* google */}
        <button
          type="button"
          className="w-full h-11 border border-gray-200 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />

          <span className="text-sm font-medium text-gray-700">
            Tiếp tục với Google
          </span>
        </button>

        {/* register */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
}