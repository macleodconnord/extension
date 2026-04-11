import {
  isEmpty,
  $helperbird_i18n,
  getBrowser,
  isChrome,
  isFirefox,
  isEdge,
  isSafari,
} from '../../app/scripts/content/utils';

describe('isEmpty', () => {
  it('returns true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  it('returns true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it('returns true for empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('returns false for non-empty string', () => {
    expect(isEmpty('hello')).toBe(false);
  });

  it('returns false for zero', () => {
    expect(isEmpty(0)).toBe(false);
  });

  it('returns false for false', () => {
    expect(isEmpty(false)).toBe(false);
  });

  it('returns false for an object', () => {
    expect(isEmpty({})).toBe(false);
  });
});

describe('$helperbird_i18n', () => {
  it('calls chrome.i18n.getMessage with the key', () => {
    $helperbird_i18n('testKey');
    expect(chrome.i18n.getMessage).toHaveBeenCalledWith('testKey', null);
  });

  it('passes replacement string to getMessage', () => {
    $helperbird_i18n('testKey', 'replacement');
    expect(chrome.i18n.getMessage).toHaveBeenCalledWith('testKey', 'replacement');
  });

  it('returns the message from chrome.i18n', () => {
    const result = $helperbird_i18n('saved');
    expect(result).toBe('saved');
  });
});

describe('isChrome', () => {
  it('returns true for Chrome user agent', () => {
    expect(
      isChrome(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Google Inc.',
      ),
    ).toBe(true);
  });

  it('returns false for Firefox user agent', () => {
    expect(
      isChrome('Mozilla/5.0 (Windows NT 10.0; rv:120.0) Gecko/20100101 Firefox/120.0', ''),
    ).toBe(false);
  });
});

describe('isFirefox', () => {
  it('returns true for Firefox user agent', () => {
    expect(
      isFirefox('Mozilla/5.0 (Windows NT 10.0; rv:120.0) Gecko/20100101 Firefox/120.0'),
    ).toBe(true);
  });

  it('returns false for Chrome user agent', () => {
    expect(
      isFirefox('Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36'),
    ).toBe(false);
  });
});

describe('isEdge', () => {
  it('returns true for Edge user agent', () => {
    expect(
      isEdge('Mozilla/5.0 AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'),
    ).toBe(true);
  });

  it('returns false for Chrome user agent', () => {
    expect(isEdge('Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36')).toBe(false);
  });
});

describe('isSafari', () => {
  it('returns true for Safari user agent', () => {
    expect(
      isSafari('Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 Safari/605.1.15'),
    ).toBe(true);
  });

  it('returns false for Chrome user agent (contains Safari string)', () => {
    expect(
      isSafari('Mozilla/5.0 AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'),
    ).toBe(false);
  });
});

describe('getBrowser', () => {
  const originalNavigator = global.navigator;

  afterEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
    });
  });

  it('returns firefox for Firefox user agent', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 Firefox/120.0',
        vendor: '',
      },
      writable: true,
    });
    expect(getBrowser()).toBe('firefox');
  });

  it('returns chrome as default fallback', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        userAgent: 'Unknown Browser',
        vendor: '',
      },
      writable: true,
    });
    expect(getBrowser()).toBe('chrome');
  });
});
