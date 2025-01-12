import { PrismaClient } from "@prisma/client";
import { RestaurantRepository } from "@/restaurant/domain/restaurant.repository";
import { PrismaRestaurantRepository } from "@/restaurant/infra/PrismaRestaurantRepository";
import {
	CreateRestaurantUseCase,
	GetRestaurantUseCase,
	ListRestaurantUseCase,
	UpdateRestaurantUseCase,
} from "@/restaurant/application/useCases";
import { mockScheduleRestaurantRepository } from "tests/mocks/schedule-repository";
import { makeCreateRestaurantDto } from "tests/helpers/restaurant-helper";

describe("RestaurantRepository test", () => {
	let restaurantRepository: RestaurantRepository;
	let createRestaurant: CreateRestaurantUseCase;
	let getRestaurant: GetRestaurantUseCase;
	let updateRestaurant: UpdateRestaurantUseCase;
	let listRestaurant: ListRestaurantUseCase;
	let restaurantId!: string;

	beforeAll(async () => {
		const prisma = new PrismaClient();
		await prisma.$executeRaw`truncate table restaurants cascade`;
	});

	beforeEach(() => {
		restaurantRepository = new PrismaRestaurantRepository();
		listRestaurant = new ListRestaurantUseCase(restaurantRepository);
		createRestaurant = new CreateRestaurantUseCase(
			restaurantRepository,
			mockScheduleRestaurantRepository,
		);
		getRestaurant = new GetRestaurantUseCase(
			restaurantRepository,
			mockScheduleRestaurantRepository,
		);
		updateRestaurant = new UpdateRestaurantUseCase(
			getRestaurant,
			restaurantRepository,
		);
	});

	test("when create restaurant then ok", async () => {
		const input = makeCreateRestaurantDto();
		const result = await createRestaurant.execute(input);

		restaurantId = result.id;

		expect(result.id).toBeDefined();
		expect(result.name).toBe(input.name);
		expect(result.picture).toBe(result.picture);
	});

	test("when update name then restaurant with new name", async () => {
		const updateRequest = {
			name: "goomer rango",
			picture: "xpto.jpeg",
		};

		const result = await updateRestaurant.execute(restaurantId, updateRequest);

		expect(result.id).toBe(restaurantId);
		expect(result.name).toBe(updateRequest.name);
		expect(result.picture).toBeDefined();
	});

	test("when list restaurant then list output format", async () => {
		const [result] = await listRestaurant.execute();

		expect(result.id).toBeDefined();
		expect(result.name).toBeDefined();
		expect(result.picture).toBeDefined();
		expect(typeof result.address).toBe("string");
	});
});
