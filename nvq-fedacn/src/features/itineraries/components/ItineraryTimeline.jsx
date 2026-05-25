import DaySchedule from "./DaySchedule";

export default function ItineraryTimeline({ daysPlan }) {
  return (
    <div>
      <h2>Chi tiết lịch trình</h2>

      {daysPlan.map((day) => (
        <DaySchedule
          key={day.day}
          day={day}
        />
      ))}
    </div>
  );
}