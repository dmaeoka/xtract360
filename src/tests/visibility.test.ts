import { evaluateCondition, shouldDisplay } from "../utils";
import type { MyObject } from "../types";

describe("conditional visibility logic", () => {
	const mockData: MyObject = {
		driver: { name: "Alice", age: 30 },
		vehicle: { type: "Car" }
	};

	describe("evaluateCondition", () => {
		it("matches equals", () => {
			expect(
				evaluateCondition(mockData, {
					path: "driver.name",
					operator: "equals",
					value: "Alice",
				})
			).toBe(true);
		});

		it("matches not", () => {
			expect(
				evaluateCondition(mockData, {
					path: "vehicle.type",
					operator: "not",
					value: "Van",
				})
			).toBe(true);
		});

		it("matches greaterThan", () => {
			expect(
				evaluateCondition(mockData, {
					path: "driver.age",
					operator: "greaterThan",
					value: 18,
				})
			).toBe(true);
		});

		it("matches lessThan", () => {
			expect(
				evaluateCondition(mockData, {
					path: "driver.age",
					operator: "lessThan",
					value: 40,
				})
			).toBe(true);
		});
	});

	describe("shouldDisplay with condition group", () => {
		it("returns true for OR when at least one is true", () => {
			expect(
				shouldDisplay(mockData, {
					operator: "OR",
					conditions: [
						{ path: "driver.age", operator: "greaterThan", value: 25 },
						{ path: "vehicle.type", operator: "equals", value: "Truck" },
					],
				})
			).toBe(true);
		});

		it("returns false for AND if any are false", () => {
			expect(
				shouldDisplay(mockData, {
					operator: "AND",
					conditions: [
						{ path: "driver.age", operator: "greaterThan", value: 25 },
						{ path: "vehicle.type", operator: "equals", value: "Truck" },
					],
				})
			).toBe(false);
		});
	});
});
