import { Schedule } from "@/schedule/domain/schedule.entity";

describe("entity Schedule", () => {
	test("when valid input then ok", () => {
		const result = new Schedule("0", "12:00", "12:15", "sat");
		expect(result).toBeInstanceOf(Schedule);
	});

	test("when short interval then throw error", () => {
		expect(() => new Schedule("0", "12:15", "12:00", "sat")).toThrow();
	});

	test("when invalid format throw error", () => {
		const inputs = ["1:30", "001:30", "01:0", "001:330", "0130", "12:377"];

		for (const input of inputs) {
			expect(() => new Schedule("0", input, "00:00", "sat")).toThrow();
		}
	});
});
