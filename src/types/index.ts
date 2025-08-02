export type CurrencyValue = {
	currency: "EUR" | "USD" | "GBP";
	value: number;
};

export type Vehicle = {
	regplate?: string;
	tradeValue?: CurrencyValue;
	type?: string;
};

export type Driver = {
	name?: string;
	age?: number;
};

export type MyObject = {
	driver?: Driver;
	vehicle?: Vehicle;
};

export type FieldType = "textInput" | "integerInput" | "enumInput" | "currencyInput";

interface BaseField {
	type: FieldType;
	label: string;
	path: string;
	defaultValue?: unknown;
	required?: boolean;
	helperText?: string;
	displayIf?: DisplayIfCondition;
}

export type DisplayIfOperator = "equals" | "not" | "greaterThan" | "lessThan";

export interface SingleCondition {
	path: string;
	operator: DisplayIfOperator;
	value: FormValue;
}

export type ConditionGroup = {
	operator: "AND" | "OR";
	conditions: SingleCondition[];
};

export type DisplayIfCondition = SingleCondition | ConditionGroup;

export interface TextInputField extends BaseField {
	type: "textInput";
	defaultValue?: string;
}

export interface IntegerInputField extends BaseField {
	type: "integerInput";
	min?: number;
	max?: number;
	defaultValue?: number;
}

export interface EnumInputField extends BaseField {
	type: "enumInput";
	values: string[];
	defaultValue?: string;
}

export interface CurrencyInputField extends BaseField {
	type: "currencyInput";
	currencyLabel?: string;
	currencies: string[];
	min?: number;
	max?: number;
	defaultValue?: CurrencyValue;
}

export type FieldConfig =
	| TextInputField
	| IntegerInputField
	| EnumInputField
	| CurrencyInputField;

export type FormValue =
	| string
	| number
	| boolean
	| null
	| undefined
	| Record<string, any>;

export interface DynamicFieldProps {
	field: FieldConfig;
	value: FormValue;
	onChange: (val: FormValue) => void;
	showErrors: boolean;
}
