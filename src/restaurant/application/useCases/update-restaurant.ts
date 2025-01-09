import type { UpdateRestaurantRequestDto } from "@/restaurant/application/dtos/update-restaurant.dto";
import type { RestaurantResponseDto } from "@/restaurant/application/dtos/restaurant.dto";
import type { RestaurantRepository } from "@/restaurant/domain/restaurant.repository";

export class UpdateRestaurantUseCase {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}

	async execute(
		restaurantId: string,
		update: UpdateRestaurantRequestDto,
	): Promise<RestaurantResponseDto> {
		const restaurant = await this.restaurantRepository.get(restaurantId);

		if (!restaurant) {
			throw new Error("resturant not found");
		}

		Object.assign(restaurant, update);

		return await this.restaurantRepository.save(restaurant);
	}
}
