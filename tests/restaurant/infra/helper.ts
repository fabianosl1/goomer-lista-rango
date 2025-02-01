import { app } from "@/app";
import type { CreateRestaurantRequestDto } from "@/restaurant/application/dtos/create-restaurant.dto";
import type { RestaurantResponseDto } from "@/restaurant/application/dtos/restaurant.dto";

export async function createRestaurant(
	body: CreateRestaurantRequestDto,
): Promise<RestaurantResponseDto> {
	const response = await app.request("/restaurants", {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-type": "application/json",
		},
	});

	if (response.status !== 201) {
		throw new Error("failed to create restaurant");
	}

	return await response.json();
}
