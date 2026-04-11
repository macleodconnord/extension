const storage = {};

const chrome = {
	storage: {
		local: {
			get: jest.fn((keys, callback) => {
				if (typeof keys === 'string') {
					const result = { [keys]: storage[keys] };
					if (callback) callback(result);
					return Promise.resolve(result);
				}
				const result = {};
				keys.forEach((key) => {
					result[key] = storage[key];
				});
				if (callback) callback(result);
				return Promise.resolve(result);
			}),
			set: jest.fn((data, callback) => {
				Object.assign(storage, data);
				if (callback) callback();
				return Promise.resolve();
			})
		},
		onChanged: {
			addListener: jest.fn()
		}
	},
	runtime: {
		getURL: jest.fn((path) => `chrome-extension://mock-id/${path}`),
		onMessage: {
			addListener: jest.fn()
		},
		lastError: null
	},
	tabs: {
		query: jest.fn((query, callback) => {
			if (callback) callback([]);
			return Promise.resolve([]);
		}),
		sendMessage: jest.fn(() => Promise.resolve())
	},
	action: {
		setBadgeBackgroundColor: jest.fn((details, callback) => {
			if (callback) callback();
		}),
		setBadgeText: jest.fn((details, callback) => {
			if (callback) callback();
		})
	},
	i18n: {
		getMessage: jest.fn((key, substitutions) => {
			if (substitutions) return `${key}_${substitutions}`;
			return key;
		})
	}
};

global.chrome = chrome;
