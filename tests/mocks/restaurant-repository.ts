import { RestaurantRepository } from "@/restaurant/domain/restaurant.repository";
import { makeRestaurant } from "tests/helpers/restaurant-helper";

export const mockRestaurantRepository: jest.Mocked<RestaurantRepository> = {
	create: jest.fn(),
	destroy: jest.fn(),
	get: jest.fn(),
	list: jest.fn(),
	save: jest.fn(),
};

mockRestaurantRepository.create.mockImplementation(async (name, address) => {
	const id = mockRestaurantRepository.create.mock.calls.length.toString();
	return makeRestaurant({ id, name, address });
});
