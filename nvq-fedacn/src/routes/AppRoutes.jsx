import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";

import CreateTripPage from "../features/trips/pages/CreateTripPage";

import ItineraryResultPage from "../features/itineraries/pages/ItineraryResultPage";
import MyItineraryPage from "../features/itineraries/pages/MyItineraryPage";
import EditItineraryPage from "../features/itineraries/pages/EditItineraryPage";
import AdminOverviewPage from "../features/admin/pages/AdminOverviewPage";
import TagManagementPage from "../features/tags/pages/TagManagementPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route path="/trips/create" element={<CreateTripPage />} />

      <Route path="/itinerary/:maChuyenDi" element={<ItineraryResultPage />} />

      <Route path="/itineraries" element={<MyItineraryPage />} />

      <Route path="/itineraries/:maChuyenDi/edit" element={<EditItineraryPage />} />
      
      <Route path="/admin" element={<AdminOverviewPage />}/>
      
      <Route path="/admin/tags" element={<TagManagementPage />} />
    </Routes>
  );
}