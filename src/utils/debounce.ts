export function debounce(ms: number = 1000) {
  return new Promise(res => {
    setTimeout(res, ms);
  });
}