import type { RestaurantResponseDto } from "@/restaurant/application/dtos/restaurant.dto";
import type { UpdateRestaurantRequestDto } from "@/restaurant/application/dtos/update-restaurant.dto";
import type { GetRestaurantUseCase } from "@/restaurant/application/useCases/get-restaurant";
import { Restaurant } from "@/restaurant/domain/restaurant.entity";
import type { RestaurantRepository } from "@/restaurant/domain/restaurant.repository";

export class UpdateRestaurantUseCase {
	constructor(
		private readonly getRestaurant: GetRestaurantUseCase,
		private readonly restaurantRepository: RestaurantRepository,
	) {}

	async execute(
		restaurantId: string,
		dto: UpdateRestaurantRequestDto,
	): Promise<RestaurantResponseDto> {
		const stored = await this.getRestaurant.execute(restaurantId);

		const address = stored.address;

		if (dto.address) {
			Object.assign(address, dto.address);
		}

		const restaurant = new Restaurant(
			stored.id,
			dto.name ?? stored.name,
			dto.picture ?? stored.picture,
			address,
		);

		await this.restaurantRepository.save(restaurant);

		Object.assign(stored, restaurant);

		return stored;
	}
}
