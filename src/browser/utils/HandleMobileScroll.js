function artificialPreventDefault(e) {
  const event = e !== undefined ? e : window.event;
  if (event.preventDefault) {
    event.preventDefault();
  }
  event.returnValue = false;
}

export function disableScroll() {
  window.ontouchmove = artificialPreventDefault;
}

export function enableScroll() {
  window.ontouchmove = null;
}
