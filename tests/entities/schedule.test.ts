import { Schedule } from "@/domain/entities/schedule.entity";
import { parserToMinutes } from "@/utils/hour";

describe("parsing input schedule hour to minutes", () => {
	test("when valid input then ok", () => {
		const expected = 90;
		const input = "01:30";

		const result = parserToMinutes(input);

		expect(result).toBe(expected);
	});

	test("when invalid input then throw error", () => {
		const inputs = ["1:30", "001:30", "01:0", "001:330", "0130"];

		for (const input of inputs) {
			expect(() => parserToMinutes(input)).toThrow();
		}
	});
});

describe("entity Schedule", () => {
	test("when valid input then ok", () => {
		const result = new Schedule("12:00", "12:15", "sat");
		expect(result).toBeInstanceOf(Schedule);
	});

	test("when valid input then ok", () => {
		expect(() => new Schedule("12:15", "12:00", "sat")).toThrow();
	});
});
