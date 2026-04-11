import getAdverts from '../../app/scripts/adverts';

describe('getAdverts', () => {
  const mockI18n = jest.fn((key) => key);

  it('returns an array of adverts', () => {
    const adverts = getAdverts(mockI18n);
    expect(Array.isArray(adverts)).toBe(true);
    expect(adverts.length).toBeGreaterThan(0);
  });

  it('each advert has href and text properties', () => {
    const adverts = getAdverts(mockI18n);
    adverts.forEach((advert) => {
      expect(advert).toHaveProperty('href');
      expect(advert).toHaveProperty('text');
      expect(typeof advert.href).toBe('string');
      expect(typeof advert.text).toBe('string');
    });
  });

  it('calls i18n function for each advert text', () => {
    getAdverts(mockI18n);
    expect(mockI18n).toHaveBeenCalledWith('followAbbie');
    expect(mockI18n).toHaveBeenCalledWith('weAreOnGithub');
    expect(mockI18n).toHaveBeenCalledWith('supportToolTip');
  });

  it('all hrefs are valid URLs', () => {
    const adverts = getAdverts(mockI18n);
    adverts.forEach((advert) => {
      expect(advert.href).toMatch(/^https?:\/\//);
    });
  });
});
