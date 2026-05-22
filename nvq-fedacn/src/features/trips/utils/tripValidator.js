export function validateTrip(state) {
  const errors = {};

  if (!state.basic.tenChuyenDi) {
    errors.tenChuyenDi = "Tên chuyến đi không được trống";
  }

  if (!state.basic.tinhDi || !state.basic.tinhDen) {
    errors.location = "Thiếu điểm đi hoặc đến";
  }

  if (state.basic.soNguoi < 1) {
    errors.soNguoi = "Số người phải >= 1";
  }

  return errors;
}