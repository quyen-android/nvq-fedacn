import {
  FileText,
  MapPin,
  CalendarDays,
  Users,
  Car,
  Wallet,
  ShieldCheck,
  ArrowRightLeft,
  Briefcase,
  ArrowRight,
} from "lucide-react";

import "./TripBasicForm.scss";

function FieldLabel({ icon, children, color = "blue" }) {
  return (
    <div className="field-label">
      <span className={`field-label__icon field-label__icon--${color}`}>
        {icon}
      </span>
      <h3>{children}</h3>
    </div>
  );
}

function SelectBox({ value, onChange, children }) {
  return (
    <div className="select-box">
      <MapPin size={18} className="select-box__icon" />

      <select value={value} onChange={onChange}>
        {children}
      </select>

      <span className="select-box__arrow">⌄</span>
    </div>
  );
}

function BudgetInput({ value, onChange }) {
  return (
    <div className="budget">
      <FieldLabel icon={<Wallet size={22} />} color="blue">
        Ngân sách dự kiến
      </FieldLabel>

      <div className="budget__input">
        <div className="budget__currency">VND</div>

        <input
          type="number"
          placeholder="Nhập ngân sách của bạn"
          value={value}
          onChange={onChange}
        />

        <div className="budget__suffix">VND</div>
      </div>

      <input
        type="range"
        min="1000000"
        max="50000000"
        step="1000000"
        value={value || 10000000}
        onChange={onChange}
        className="budget__range"
      />

      <div className="budget__labels">
        <span>1 triệu</span>
        <span>10 triệu</span>
        <span>50+ triệu</span>
      </div>
    </div>
  );
}

export default function TripBasicForm({
  formData,
  updateField,
  options,
  onNext,
}) {
  const increasePeople = () => {
    updateField("so_nguoi", Number(formData.so_nguoi || 1) + 1);
  };

  const decreasePeople = () => {
    if (Number(formData.so_nguoi || 1) > 1) {
      updateField("so_nguoi", Number(formData.so_nguoi || 1) - 1);
    }
  };

  const swapLocation = () => {
    const tinhDi = formData.ma_tinh_di;
    const tinhDen = formData.ma_tinh_den;

    updateField("ma_tinh_di", tinhDen);
    updateField("ma_tinh_den", tinhDi);
  };

  const today = new Date()
  .toISOString()
  .split("T")[0];

  return (
    <div className="trip-basic-form">
      <div className="trip-step">
        <div className="trip-step__item trip-step__item--active">
          <span>1</span>
          <p>Thông tin chuyến đi</p>
        </div>

        <div className="trip-step__line" />

        <div className="trip-step__item">
          <span>2</span>
          <p>Cá nhân hóa chuyến đi</p>
        </div>
      </div>

      <div className="trip-basic-form__body">
        <div className="trip-basic-form__header">
          <h2>Thông tin chuyến đi</h2>
          <p>Nhập các thông tin cơ bản cho chuyến đi của bạn</p>
        </div>

        <div className="trip-basic-form__content">
          <div className="form-section">
            <FieldLabel icon={<FileText size={22} />}>
              Tên chuyến đi
            </FieldLabel>

            <div className="input-icon">
              <input
                type="text"
                placeholder="Nhập tên chuyến đi của bạn"
                value={formData.ten_chuyen_di}
                onChange={(e) =>
                  updateField("ten_chuyen_di", e.target.value)
                }
              />

              <Briefcase size={20} />
            </div>
          </div>

          <div className="form-section">
            <FieldLabel icon={<MapPin size={22} />} color="green">
              Điểm đi & điểm đến
            </FieldLabel>

            <div className="location-grid">
              <div>
                <label>Tỉnh/Thành phố đi</label>

                <SelectBox
                  value={formData.ma_tinh_di}
                  onChange={(e) =>
                    updateField("ma_tinh_di", e.target.value)
                  }
                >
                  <option value="">Chọn tỉnh / thành phố đi</option>
                  {options?.tinhs?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </SelectBox>
              </div>

              <button
                type="button"
                onClick={swapLocation}
                className="swap-btn"
              >
                <ArrowRight size={18} />
              </button>

              <div>
                <label>Tỉnh/Thành phố đến</label>

                <SelectBox
                  value={formData.ma_tinh_den}
                  onChange={(e) =>
                    updateField("ma_tinh_den", e.target.value)
                  }
                >
                  <option value="">Chọn tỉnh / thành phố đến</option>
                  {options?.tinhs?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </SelectBox>
              </div>
            </div>
          </div>

          <div className="form-section">
            <FieldLabel icon={<CalendarDays size={22} />}>
              Thời gian
            </FieldLabel>

            <div className="two-grid">
              <div>
                <label>Ngày đi</label>

                <input
                  type="date"
                  min={today}
                  value={formData.ngay_di}
                  onChange={(e) =>
                    updateField("ngay_di", e.target.value)
                  }
                  className="base-input"
                />
                
              </div>

              <div>
                <label>Ngày về</label>

                <input
                  type="date"
                  min={formData.ngay_di || today}
                  value={formData.ngay_ve}
                  onChange={(e) =>
                    updateField("ngay_ve", e.target.value)
                  }
                  className="base-input"
                />
              </div>
            </div>
          </div>

          <div className="two-grid">
            <div className="form-section">
              <FieldLabel icon={<Users size={22} />} color="orange">
                Số người
              </FieldLabel>

              <div className="people-input">
                <button type="button" onClick={decreasePeople}>
                  -
                </button>

                <span>{formData.so_nguoi || 1}</span>

                <button type="button" onClick={increasePeople}>
                  +
                </button>
              </div>
            </div>

            <div className="form-section">
              <FieldLabel icon={<Car size={22} />}>
                Phương tiện di chuyển
              </FieldLabel>

              <select
                value={formData.ma_pt}
                onChange={(e) =>
                  updateField("ma_pt", e.target.value)
                }
                className="base-input"
              >
                <option value="">Chọn phương tiện di chuyển</option>
                {options?.phuong_tiens?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <BudgetInput
            value={formData.ngan_sach}
            onChange={(e) =>
              updateField("ngan_sach", e.target.value)
            }
          />

          <div className="trip-basic-form__footer">
            <div className="safe-box">
              <ShieldCheck size={22} />
              <span>
                Thông tin của bạn được bảo mật và chỉ sử dụng để đề xuất
                lịch trình phù hợp nhất.
              </span>
            </div>

            <button
              type="button"
              onClick={onNext}
              className="next-btn"
            >
              Tiếp tục
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}