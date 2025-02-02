import type { RestaurantRepository } from "@/restaurant/domain/restaurant.repository";
import { makeRestaurant } from "tests/helpers/restaurant-helper";

export const mockRestaurantRepository: jest.Mocked<RestaurantRepository> = {
	destroy: jest.fn(),
	get: jest.fn(),
	list: jest.fn(),
	save: jest.fn(),
};

mockRestaurantRepository.save.mockImplementation(async (restaurant) => {
	if (restaurant.id === null) {
		const id = mockRestaurantRepository.save.mock.calls.length.toString();
		restaurant.id = id;
	}
});

mockRestaurantRepository.get.mockImplementation(async (id) => {
	return makeRestaurant({ id });
});

mockRestaurantRepository.list.mockImplementation(async () => {
	return [
		makeRestaurant({ id: "1" }),
		makeRestaurant({ id: "2" }),
		makeRestaurant({ id: "3" }),
	];
});
