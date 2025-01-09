import { parseMinutes, Schedule } from "@/schedule/domain/schedule.entity";

describe("parsing input schedule hour to minutes", () => {
	test("when valid input then ok", () => {
		const expected = 90;
		const input = "01:30";

		const result = parseMinutes(input);

		expect(result).toBe(expected);
	});

	test("when invalid input then throw error", () => {
		const inputs = ["1:30", "001:30", "01:0", "001:330", "0130", "12:377"];

		for (const input of inputs) {
			expect(() => parseMinutes(input)).toThrow();
		}
	});
});

describe("entity Schedule", () => {
	test("when valid input then ok", () => {
		const result = new Schedule("0", "12:00", "12:15", "sat");
		expect(result).toBeInstanceOf(Schedule);
	});

	test("when short interval then throw error", () => {
		expect(() => new Schedule("0", "12:15", "12:00", "sat")).toThrow();
	});
});
