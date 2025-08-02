import { assocPath } from "ramda";
import { MyObject, FormValue, SingleCondition, DisplayIfCondition } from "../types";
import objectJson from "../data/object.json";

export const setDeep = (
	obj: MyObject,
	path: string,
	value: FormValue,
): MyObject => {
	return assocPath(path.split("."), value)(obj) as MyObject;
};

export const getData = () => {
	return objectJson as MyObject;
};

export const getDeep = (obj: any, path: string) => {
	return path.split(".").reduce((acc, part) => acc?.[part], obj);
};

export const isCurrencyObject = (val: unknown): val is { currency?: string; value?: number } => {
	return typeof val === "object" && val !== null && "currency" in val && "value" in val;
}

export const isEmpty = (value: unknown): boolean => {
	return (
		value === null ||
		value === undefined ||
		value === "" ||
		(typeof value === "object" &&
			value !== null &&
			Object.keys(value).length === 0)
	);
}

export const evaluateCondition = (object: MyObject, condition: SingleCondition): boolean => {
	const actual = getDeep(object, condition.path);

	switch (condition.operator) {
		case "equals":
			return actual === condition.value;
		case "not":
			return actual !== condition.value;
		case "greaterThan":
			return typeof actual === "number" && actual > (condition.value as number);
		case "lessThan":
			return typeof actual === "number" && actual < (condition.value as number);
		default:
			return true;
	}
};

export function shouldDisplay(object: MyObject, condition: DisplayIfCondition | undefined): boolean {
	if (!condition) return true;

	if ("conditions" in condition) {
		const results = condition.conditions.map((c) => evaluateCondition(object, c));
		return condition.operator === "AND"
			? results.every(Boolean)
			: results.some(Boolean);
	}

	return evaluateCondition(object, condition);
}
