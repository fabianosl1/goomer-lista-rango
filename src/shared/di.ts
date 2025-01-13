import {
	CreateRestaurantUseCase,
	GetRestaurantUseCase,
	ListRestaurantUseCase,
	UpdateRestaurantUseCase,
} from "@/restaurant/application/useCases";
import { DeleteRestaurantUseCase } from "@/restaurant/application/useCases/delete-restaurant";
import { PrismaRestaurantRepository } from "@/restaurant/infra/prisma-restaurant.repository";
import { PrismaScheduleRestaurantRepository } from "@/schedule/infra/prisma-scheduleRestaurant.repository";

const restaurantRepository = new PrismaRestaurantRepository();
const scheduleRestaurantRepository = new PrismaScheduleRestaurantRepository();

const listRestaurant = new ListRestaurantUseCase(restaurantRepository);
const getRestaurant = new GetRestaurantUseCase(
	restaurantRepository,
	scheduleRestaurantRepository,
);
const createRestaurant = new CreateRestaurantUseCase(
	restaurantRepository,
	scheduleRestaurantRepository,
);
const updateRestaurant = new UpdateRestaurantUseCase(
	getRestaurant,
	restaurantRepository,
);
const deleteRestaurant = new DeleteRestaurantUseCase(restaurantRepository);

export {
	listRestaurant,
	getRestaurant,
	createRestaurant,
	updateRestaurant,
	deleteRestaurant,
};
