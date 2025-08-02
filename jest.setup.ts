// jest.setup.ts
import '@testing-library/jest-dom';
const originalWarn = console.warn;

beforeAll(() => {
	console.warn = (...args: unknown[]) => {
		if (
			typeof args[0] === "string" &&
			args[0].includes("React Router Future Flag Warning")
		) {
			return;
		}
		originalWarn(...args);
	};
});
