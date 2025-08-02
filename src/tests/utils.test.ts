import { getDeep, setDeep, isEmpty } from "../utils";
import type { MyObject } from "../types";

describe("utils.ts", () => {
	const mockObject: MyObject = {
		driver: { name: "Alice", age: 30 },
		vehicle: { regplate: "XYZ123", tradeValue: { currency: "EUR", value: 1000 } },
	};

	describe("getDeep", () => {
		it("retrieves nested values correctly", () => {
			expect(getDeep(mockObject, "driver.name")).toBe("Alice");
			expect(getDeep(mockObject, "vehicle.regplate")).toBe("XYZ123");
			expect(getDeep(mockObject, "vehicle.tradeValue.currency")).toBe("EUR");
		});

		it("returns undefined for missing paths", () => {
			expect(getDeep(mockObject, "driver.license")).toBeUndefined();
			expect(getDeep(mockObject, "vehicle.color")).toBeUndefined();
		});
	});

	describe("setDeep", () => {
		it("sets a deeply nested value immutably", () => {
			const updated = setDeep(mockObject, "driver.name", "Bob");
			expect(updated.driver?.name).toBe("Bob");
			expect(mockObject.driver?.name).toBe("Alice"); // original is unchanged
		});

		it("adds a new deeply nested path", () => {
			const updated = setDeep(mockObject, "driver.license", "ABC123");
			expect(getDeep(updated, "driver.license")).toBe("ABC123");
		});
	});

	describe("isEmpty", () => {
		it("returns true for null/undefined/empty values", () => {
			expect(isEmpty("")).toBe(true);
			expect(isEmpty(null)).toBe(true);
			expect(isEmpty(undefined)).toBe(true);
			expect(isEmpty({})).toBe(true);
		});

		it("returns false for non-empty values", () => {
			expect(isEmpty("hello")).toBe(false);
			expect(isEmpty(0)).toBe(false);
			expect(isEmpty(false)).toBe(false);
			expect(isEmpty({ key: "value" })).toBe(false);
		});
	});
});
