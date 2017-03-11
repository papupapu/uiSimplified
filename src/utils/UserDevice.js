export function userDevice() {
  const viewport = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  };
  const isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
  let device = '';
  if (viewport.width > 950 && !isTouch) {
    device = 'desktop';
  } else if (
    (viewport.width < 950 && viewport.width > 670) ||
    (viewport.width > 950 && isTouch)
  ) {
    device = 'tablet';
  } else {
    device = 'smartphone';
  }
  return { viewport, device };
}
