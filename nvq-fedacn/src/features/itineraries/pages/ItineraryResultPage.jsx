import { useEffect } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import { useItinerary } from "../hooks/useItinerary";
import ItinerarySummary from "../components/ItinerarySummary";
import ItineraryTimeline from "../components/ItineraryTimeline";
import AIRecommendation from "../components/AIRecommendation";
import AIChatbot from "../components/AIChatbot";

export default function ItineraryResultPage() {
  const { maChuyenDi } = useParams();

  const { itinerary, loading, error, generatePlan } = useItinerary();

  useEffect(() => {
    if (maChuyenDi) {
      generatePlan(maChuyenDi);
    }
  }, [maChuyenDi]);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#f5f7fb] p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1b2559]">
            Lịch trình gợi ý
          </h1>

          <p className="mt-2 text-gray-400">
            AI đã tạo lịch trình phù hợp với chuyến đi của bạn
          </p>
        </div>

        {loading && (
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-lg font-semibold text-[#1b2559]">
              AI đang tạo lịch trình...
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && !itinerary && (
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-gray-500">Chưa có lịch trình</p>
          </div>
        )}

        {!loading && !error && itinerary && (
          <div className="space-y-6">
            <ItinerarySummary itinerary={itinerary} />
            <AIRecommendation itinerary={itinerary} />
            <ItineraryTimeline daysPlan={itinerary.days_plan || []} />
          </div>
        )}
      </div>
      <AIChatbot />
    </DashboardLayout>
  );
}