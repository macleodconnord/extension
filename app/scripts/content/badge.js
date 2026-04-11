const BADGE_COLOR_ON = '#34c759';
const BADGE_COLOR_OFF = '#ff3c2f';

export function update({ state }) {
  if (state) {
    on();
  } else {
    off();
  }
}

export function off() {
  setColor(BADGE_COLOR_OFF);
  setText('off');
}

export function on() {
  setColor(BADGE_COLOR_ON);
  setText('on');
}

function setColor(color) {
  chrome.action.setBadgeBackgroundColor({ color }, () => {
    if (chrome.runtime.lastError) {
      console.error('Badge color error:', chrome.runtime.lastError.message);
    }
  });
}

function setText(text) {
  chrome.action.setBadgeText({ text }, () => {
    if (chrome.runtime.lastError) {
      console.error('Badge text error:', chrome.runtime.lastError.message);
    }
  });
}
