import type { UpdateRestaurantDto } from "@/application/dtos/request/update-restaurant.dto";
import type { RestaurantDto } from "@/application/dtos/response/restaurant.dto";
import type { RestaurantRepository } from "@/domain/repositories/restaurant.repository";

export class UpdateRestaurantUseCase {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}

	async execute(
		restaurantId: string,
		update: UpdateRestaurantDto,
	): Promise<RestaurantDto> {
		const restaurant = await this.restaurantRepository.get(restaurantId);

		if (!restaurant) {
			throw new Error("resturant not found");
		}

		Object.assign(restaurant, update);

		return await this.restaurantRepository.save(restaurant);
	}
}
