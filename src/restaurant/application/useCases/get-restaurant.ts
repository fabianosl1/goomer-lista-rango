import { RestaurantResponseDto } from "@/restaurant/application/dtos/restaurant.dto";
import type { RestaurantRepository } from "@/restaurant/domain/restaurant.repository";
import type { ScheduleRestaurantRepository } from "@/schedule/domain/scheduleRestaurant.repository";

export class GetRestaurantUseCase {
	constructor(
		private readonly restaurantRepository: RestaurantRepository,
		private readonly scheduleRepository: ScheduleRestaurantRepository,
	) {}

	async execute(restaurantId: string): Promise<RestaurantResponseDto> {
		const restaurant = await this.restaurantRepository.get(restaurantId);

		if (!restaurant) {
			throw new Error("restaurant not found");
		}

		const schedules =
			await this.scheduleRepository.listByRestaurantId(restaurantId);

		return new RestaurantResponseDto(restaurant, schedules);
	}
}
