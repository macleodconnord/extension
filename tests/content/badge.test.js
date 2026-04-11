import { update, on, off } from '../../app/scripts/content/badge';

beforeEach(() => {
  jest.clearAllMocks();
  chrome.runtime.lastError = null;
});

describe('update', () => {
  it('calls on() when state is true', () => {
    update({ state: true });
    expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith(
      { color: '#34c759' },
      expect.any(Function),
    );
    expect(chrome.action.setBadgeText).toHaveBeenCalledWith(
      { text: 'on' },
      expect.any(Function),
    );
  });

  it('calls off() when state is false', () => {
    update({ state: false });
    expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith(
      { color: '#ff3c2f' },
      expect.any(Function),
    );
    expect(chrome.action.setBadgeText).toHaveBeenCalledWith(
      { text: 'off' },
      expect.any(Function),
    );
  });
});

describe('on', () => {
  it('sets badge color to green', () => {
    on();
    expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith(
      { color: '#34c759' },
      expect.any(Function),
    );
  });

  it('sets badge text to on', () => {
    on();
    expect(chrome.action.setBadgeText).toHaveBeenCalledWith(
      { text: 'on' },
      expect.any(Function),
    );
  });
});

describe('off', () => {
  it('sets badge color to red', () => {
    off();
    expect(chrome.action.setBadgeBackgroundColor).toHaveBeenCalledWith(
      { color: '#ff3c2f' },
      expect.any(Function),
    );
  });

  it('sets badge text to off', () => {
    off();
    expect(chrome.action.setBadgeText).toHaveBeenCalledWith(
      { text: 'off' },
      expect.any(Function),
    );
  });
});

describe('error handling', () => {
  it('logs error when setBadgeBackgroundColor fails', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    chrome.runtime.lastError = { message: 'test error' };

    chrome.action.setBadgeBackgroundColor.mockImplementation((details, callback) => {
      callback();
    });

    on();

    expect(consoleSpy).toHaveBeenCalledWith('Badge color error:', 'test error');
    consoleSpy.mockRestore();
    chrome.runtime.lastError = null;
  });

  it('logs error when setBadgeText fails', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    chrome.runtime.lastError = { message: 'text error' };

    chrome.action.setBadgeText.mockImplementation((details, callback) => {
      callback();
    });

    on();

    expect(consoleSpy).toHaveBeenCalledWith('Badge text error:', 'text error');
    consoleSpy.mockRestore();
    chrome.runtime.lastError = null;
  });
});
