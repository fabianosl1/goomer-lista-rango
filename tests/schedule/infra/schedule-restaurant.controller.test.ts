import { app } from "@/app";
import type { ScheduleResponseDto } from "@/schedule/application/dtos/schedule.dto";
import type { UpdateScheduleDto } from "@/schedule/application/dtos/update-schedule.dto";
import {
	createRestaurant,
	getRestaurant,
	makeCreateRestaurantDto,
} from "tests/helpers/restaurant-helper";
import { makeCreateScheduleDto } from "tests/helpers/schedule-helper";

describe("Schedule restaurant controller e2e", () => {
	test("POST /restaurants/:restaurantId/schedules", async () => {
		const restaurant = await createRestaurant(makeCreateRestaurantDto());
		const body = makeCreateScheduleDto();

		const response = await app.request(
			`/restaurants/${restaurant.id}/schedules`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);

		expect(response.status).toBe(201);

		const schedule: ScheduleResponseDto = await response.json();

		expect(schedule.id).toBeDefined();
		expect(schedule.id).not.toBeNull();
		expect(schedule.begin).toEqual(body.begin);
		expect(schedule.end).toEqual(body.end);
		expect(schedule.day).toEqual(body.day);
	});

	test("DELETE /restaurant/:restaurantId/schedules/:scheduleId", async () => {
		let restaurant = await createRestaurant(
			makeCreateRestaurantDto({
				schedules: [makeCreateScheduleDto()],
			}),
		);

		const response = await app.request(
			`/restaurants/${restaurant.id}/schedules/${restaurant.schedules[0].id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		expect(response.status).toBe(204);
		expect(restaurant.schedules.length).toBe(1);

		restaurant = await getRestaurant(restaurant.id);

		expect(restaurant.schedules.length).toBe(0);
	});

	test("PATCH /restaurant/:restaurantId/schedules/:scheduleId", async () => {
		let restaurant = await createRestaurant(
			makeCreateRestaurantDto({
				schedules: [makeCreateScheduleDto({ day: "sat" })],
			}),
		);

		const body: UpdateScheduleDto = {
			day: "wed",
		};

		const response = await app.request(
			`/restaurants/${restaurant.id}/schedules/${restaurant.schedules[0].id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
		);

		expect(response.status).toBe(200);

		const schedule = await response.json();

		expect(schedule.day).toBe(body.day);

		expect(schedule).not.toEqual(restaurant.schedules[0]);

		restaurant = await getRestaurant(restaurant.id);

		expect(schedule).toEqual(restaurant.schedules[0]);
	});
});
