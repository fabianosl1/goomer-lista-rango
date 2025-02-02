import {
	CreateRestaurantUseCase,
	GetRestaurantUseCase,
	ListRestaurantUseCase,
	UpdateRestaurantUseCase,
} from "@/restaurant/application/useCases";
import { DeleteRestaurantUseCase } from "@/restaurant/application/useCases/delete-restaurant";
import { PrismaRestaurantRepository } from "@/restaurant/infra/prisma-restaurant.repository";
import { CreateScheduleRestaurantUseCase } from "@/schedule/application/use-cases/create-schedule-restaurant";
import { DeleteScheduleRestaurantUseCase } from "@/schedule/application/use-cases/delete-schedule-restaurant";
import { UpdateScheduleRestaurantUseCase } from "@/schedule/application/use-cases/update-schedule-restaurant";
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

const createScheduleRestaurant = new CreateScheduleRestaurantUseCase(
	scheduleRestaurantRepository,
);

const updateScheduleRestaurant = new UpdateScheduleRestaurantUseCase(
	scheduleRestaurantRepository,
);

const deleteScheduleRestaurant = new DeleteScheduleRestaurantUseCase(
	scheduleRestaurantRepository,
);

export {
	listRestaurant,
	getRestaurant,
	createRestaurant,
	updateRestaurant,
	deleteRestaurant,
	createScheduleRestaurant,
	updateScheduleRestaurant,
	deleteScheduleRestaurant,
};
