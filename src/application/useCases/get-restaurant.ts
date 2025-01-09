import type { RestaurantDto } from "@/application/dtos/response/restaurant.dto";
import type { RestaurantRepository } from "@/domain/repositories/restaurant.repository";

export class GetRestaurantUseCase {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}

	async execute(restaurantId: string): Promise<RestaurantDto> {
		const restaurant = await this.restaurantRepository.get(restaurantId);

		if (!restaurant) {
			throw new Error("restaurant not found");
		}

		return restaurant;
	}
}
