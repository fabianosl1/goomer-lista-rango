import { ListRestaurantUseCase } from "@/restaurant/application/useCases/list-restaurant";
import { mockRestaurantRepository } from "tests/mocks/restaurant-repository";

describe("list restaurant test use case", () => {
	let listRestaurant: ListRestaurantUseCase;

	beforeEach(() => {
		jest.clearAllMocks();
		listRestaurant = new ListRestaurantUseCase(mockRestaurantRepository);
	});

	test("when list restaurant then output format", async () => {
		const result = await listRestaurant.execute();

		expect(result).toBeDefined();
		expect(result[0].id).toBeDefined();
		expect(result[0].name).toBeDefined();
		expect(result[0].picture).toBeDefined();
		expect(typeof result[0].address).toBe("string");
	});

	test("when empty list ten ok", async () => {
		mockRestaurantRepository.list.mockResolvedValueOnce([]);
		const result = await listRestaurant.execute();

		expect(result).toBeDefined();
		expect(result.length).toBe(0);
		expect(mockRestaurantRepository.list.mock.calls.length).toBe(1);
	});
});
