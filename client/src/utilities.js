export function numberWithCommas(num) {
  return num.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
