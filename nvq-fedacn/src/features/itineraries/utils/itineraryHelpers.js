export function formatMoney(value) {
  return Number(value || 0).toLocaleString("vi-VN") + " VNĐ";
}

export function formatDistance(value) {
  return `${Number(value || 0).toFixed(2)} km`;
}