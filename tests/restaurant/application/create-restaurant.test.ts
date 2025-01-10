import { CreateRestaurantUseCase } from "@/restaurant/application/useCases/create-restaurant";
import { makeCreateRestaurantDto } from "tests/helpers/restaurant-helper";
import { makeCreateScheduleDto } from "tests/helpers/schedule-helper";
import { mockRestaurantRepository } from "tests/mocks/restaurant-repository";
import { mockScheduleRestaurantRepository } from "tests/mocks/schedule-repository";

describe("Create restaurant use case", () => {
	let createRestaurant: CreateRestaurantUseCase;

	beforeEach(() => {
		createRestaurant = new CreateRestaurantUseCase(
			mockRestaurantRepository,
			mockScheduleRestaurantRepository,
		);
	});

	test("when valid request then ok", async () => {
		const input = makeCreateRestaurantDto();
		const result = await createRestaurant.execute(input);

		expect(result).toBeDefined();
		expect(result.id).toBeDefined();
		expect(result.picture).toBeNull();
	});

	test("when with schedules then ok", async () => {
		const input = makeCreateRestaurantDto({
			schedules: [
				makeCreateScheduleDto(),
				makeCreateScheduleDto(),
				makeCreateScheduleDto(),
			],
		});
		const result = await createRestaurant.execute(input);

		expect(result).toBeDefined();
		expect(result.id).toBeDefined();
		expect(result.picture).toBeNull();
		expect(result.schedules.length).toBe(input.schedules.length);
	});

	test("when invalid scheule then throw error", async () => {
		const input = makeCreateRestaurantDto({
			schedules: [
				makeCreateScheduleDto(),
				makeCreateScheduleDto({ begin: "13:30", end: "13:35" }),
			],
		});

		expect(async () => await createRestaurant.execute(input)).rejects.toThrow();
	});

	test("when empty name then throw error", async () => {
		const input = makeCreateRestaurantDto({
			name: "",
		});

		expect(async () => await createRestaurant.execute(input)).rejects.toThrow();
	});
});
