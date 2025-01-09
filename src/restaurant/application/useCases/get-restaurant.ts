import type { RestaurantResponseDto } from "@/restaurant/application/dtos/restaurant.dto";
import type { RestaurantRepository } from "@/restaurant/domain/restaurant.repository";

export class GetRestaurantUseCase {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}

	async execute(restaurantId: string): Promise<RestaurantResponseDto> {
		const restaurant = await this.restaurantRepository.get(restaurantId);

		if (!restaurant) {
			throw new Error("restaurant not found");
		}

		return restaurant;
	}
}
