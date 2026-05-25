import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  loginApi,
  registerApi,
  forgotPasswordApi,
  resetPasswordApi,
  getMeApi,
} from "../services/authService";

import {
  saveAuthTokens,
  clearAuthTokens,
  saveCurrentUser
} from "../store/authStore";

export function useAuth() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError("");

      const result = await loginApi(email, password);

      saveAuthTokens(result);

      const user = await getMeApi();

      // saveCurrentUser(user);
      
      if (user.quyen === "admin") {
        navigate("/admin");
      } else {
        navigate("/trips/create");
      }

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      setError("");

      await registerApi(data);

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError("");

      await forgotPasswordApi(email);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data) => {
    try {
      setLoading(true);
      setError("");

      await resetPasswordApi(data);

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuthTokens();
    navigate("/login");
  };

  return {
    loading,
    error,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
  };
}