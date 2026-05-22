import {
  Sparkles,
  Heart,
  ClipboardCheck,
  Check,
  ArrowLeft,
  WandSparkles,
} from "lucide-react";

import "./TripPersonalization.scss";

function OptionCard({
  item,
  checked,
  onToggle,
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`option-card ${checked ? "option-card--active" : ""}`}
    >

      <span className="option-card__name">
        {item.name}
      </span>
    </button>
  );
}

function OptionSection({
  title,
  description,
  icon,
  items = [],
  selectedIds = [],
  onToggle,
  color = "blue",
}) {
  return (
    <section className="personal-section">
      <div className="personal-section__header">
        <div className={`personal-section__icon personal-section__icon--${color}`}>
          {icon}
        </div>

        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      <div className="option-grid">
        {items.map((item) => (
          <OptionCard
            key={item.id}
            item={item}
            checked={selectedIds.includes(item.id)}
            onToggle={() => onToggle(item.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default function TripPersonalization({
  formData,
  toggleArrayValue,
  options,
  onBack,
  onSubmit,
  loading = false,
}) {
  return (
    <div className="trip-personalization">
      <div className="trip-step">
        <div className="trip-step__item">
          <span>1</span>
          <p>Thông tin chuyến đi</p>
        </div>

        <div className="trip-step__line trip-step__line--active" />

        <div className="trip-step__item trip-step__item--active">
          <span>2</span>
          <p>Cá nhân hóa chuyến đi</p>
        </div>
      </div>

      <div className="trip-personalization__body">
        <div className="trip-personalization__header">
          <h2>Cá nhân hóa chuyến đi</h2>
          <p>
            Chọn phong cách, sở thích và yêu cầu đặc biệt để AI đề xuất
            lịch trình phù hợp nhất với bạn.
          </p>
        </div>

        <div className="trip-personalization__content">
          <OptionSection
            title="Loại du lịch"
            description="Bạn muốn chuyến đi theo phong cách nào?"
            icon={<Sparkles size={24} />}
            color="blue"
            items={options?.loai_du_lichs || []}
            selectedIds={formData.loai_du_lich_ids || []}
            onToggle={(id) =>
              toggleArrayValue("loai_du_lich_ids", id)
            }
          />

          <OptionSection
            title="Sở thích"
            description="Những hoạt động bạn quan tâm trong chuyến đi"
            icon={<Heart size={24} />}
            color="rose"
            items={options?.so_thichs || []}
            selectedIds={formData.so_thich_ids || []}
            onToggle={(id) =>
              toggleArrayValue("so_thich_ids", id)
            }
          />

          <OptionSection
            title="Yêu cầu đặc biệt"
            description="Các điều kiện cần ưu tiên khi tạo lịch trình"
            icon={<ClipboardCheck size={24} />}
            color="green"
            items={options?.yeu_caus || []}
            selectedIds={formData.yeu_cau_ids || []}
            onToggle={(id) =>
              toggleArrayValue("yeu_cau_ids", id)
            }
          />
        </div>

        <div className="trip-personalization__footer">
          <button
            type="button"
            onClick={onBack}
            className="back-btn"
          >
            <ArrowLeft size={18} />
            Quay lại
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="generate-btn"
          >
            <WandSparkles size={20} />
            {loading ? "Đang tạo..." : "Tạo lịch trình"}
          </button>
        </div>
      </div>
    </div>
  );
}