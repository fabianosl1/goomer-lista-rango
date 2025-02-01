import { app } from "@/app";
import type { ListRestaurantResponseDto } from "@/restaurant/application/dtos/list-restaurant.dto";
import type { RestaurantResponseDto } from "@/restaurant/application/dtos/restaurant.dto";
import { makeCreateRestaurantDto } from "tests/helpers/restaurant-helper";
import { makeCreateScheduleDto } from "tests/helpers/schedule-helper";
import { createRestaurant } from "tests/restaurant/infra/helper";

describe("Restaurant test controller E2E", () => {
	test("POST /restaurants", async () => {
		const body = makeCreateRestaurantDto({
			schedules: [makeCreateScheduleDto()],
		});

		const response = await app.request("/restaurants", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});

		expect(response.status).toBe(201);

		const restaurant: RestaurantResponseDto = await response.json();

		expect(restaurant.id).toBeDefined();
		expect(restaurant.name).toBe(body.name);
		expect(restaurant.schedules[0].id).toBeDefined();
	});

	test("GET /restaurants", async () => {
		await createRestaurant(makeCreateRestaurantDto());

		const response = await app.request("/restaurants");

		expect(response.status).toBe(200);

		const restaurants: ListRestaurantResponseDto = await response.json();

		expect(restaurants.length).toBeDefined();

		for (const restaurant of restaurants) {
			expect(restaurant.id).toBeDefined();
			expect(typeof restaurant.address).toBe("string");
			expect(restaurant.picture).toBeDefined();
		}
	});

	test("GET /restaurants/:id", async () => {
		const created = await createRestaurant(makeCreateRestaurantDto());

		const response = await app.request(`/restaurants/${created.id}`);

		expect(response.status).toBe(200);

		const restaurant: RestaurantResponseDto = await response.json();

		expect(restaurant.id).toBeDefined();
		expect(restaurant).toEqual(created);
	});
});
