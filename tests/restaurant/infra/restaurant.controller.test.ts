import { app } from "@/app";
import { makeCreateRestaurantDto } from "tests/helpers/restaurant-helper";
import { makeCreateScheduleDto } from "tests/helpers/schedule-helper";

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
	});
});
