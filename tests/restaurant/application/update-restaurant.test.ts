import { UpdateRestaurantUseCase } from "@/restaurant/application/useCases/update-restaurant";
import { mockRestaurantRepository } from "tests/mocks/restaurant-repository";
import { mockScheduleRestaurantRepository } from "tests/mocks/schedule-repository";

describe("Update restaurant use case tests", () => {
	let updateRestaurant: UpdateRestaurantUseCase;

	beforeEach(() => {
		jest.clearAllMocks();
		updateRestaurant = new UpdateRestaurantUseCase(
			mockRestaurantRepository,
			mockScheduleRestaurantRepository,
		);
	});

	test("when update name then restaurant with new name", async () => {
		const restaurantId = "321";

		const updateRequest = {
			name: "goomer rango",
			picture: "xpto.jpeg",
		};

		const result = await updateRestaurant.execute(restaurantId, updateRequest);

		expect(result.id).toBe(restaurantId);
		expect(result.name).toBe(updateRequest.name);
		expect(result.picture).toBeDefined();
		expect(mockRestaurantRepository.get.mock.calls.length).toBe(1);
		expect(mockRestaurantRepository.save.mock.calls.length).toBe(1);
	});

	test("when restaurant not found then throw error", async () => {
		const restaurant = "1";
		mockRestaurantRepository.get.mockResolvedValueOnce(null);

		expect(() => updateRestaurant.execute(restaurant, {})).rejects.toThrow();
		expect(mockRestaurantRepository.get.mock.calls.length).toBe(1);
		expect(mockRestaurantRepository.save.mock.calls.length).toBe(0);
	});
});
