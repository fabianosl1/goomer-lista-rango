import type { RestaurantResponseDto } from "@/restaurant/application/dtos/restaurant.dto";
import type { UpdateRestaurantRequestDto } from "@/restaurant/application/dtos/update-restaurant.dto";
import type { RestaurantRepository } from "@/restaurant/domain/restaurant.repository";
import type { ScheduleRestaurantRepository } from "@/schedule/domain/scheduleRestaurant.repository";

export class UpdateRestaurantUseCase {
	constructor(
		private readonly restaurantRepository: RestaurantRepository,
		private readonly scheduleRepository: ScheduleRestaurantRepository,
	) {}

	async execute(
		restaurantId: string,
		update: UpdateRestaurantRequestDto,
	): Promise<RestaurantResponseDto> {
		const restaurant = await this.restaurantRepository.get(restaurantId);

		if (!restaurant) {
			throw new Error("resturant not found");
		}

		Object.assign(restaurant, update);

		await this.restaurantRepository.save(restaurant);

		const schedules =
			await this.scheduleRepository.listByRestaurantId(restaurantId);

		return {
			...restaurant,
			schedules,
		};
	}
}
