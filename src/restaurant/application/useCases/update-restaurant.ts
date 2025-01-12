import type { RestaurantResponseDto } from "@/restaurant/application/dtos/restaurant.dto";
import type { UpdateRestaurantRequestDto } from "@/restaurant/application/dtos/update-restaurant.dto";
import type { GetRestaurantUseCase } from "@/restaurant/application/useCases/get-restaurant";
import type { RestaurantRepository } from "@/restaurant/domain/restaurant.repository";

export class UpdateRestaurantUseCase {
	constructor(
		private readonly getRestaurant: GetRestaurantUseCase,
		private readonly restaurantRepository: RestaurantRepository,
	) {}

	async execute(
		restaurantId: string,
		update: UpdateRestaurantRequestDto,
	): Promise<RestaurantResponseDto> {
		const restaurant = await this.getRestaurant.execute(restaurantId);

		Object.assign(restaurant, update);

		await this.restaurantRepository.save(restaurant);

		return restaurant;
	}
}
