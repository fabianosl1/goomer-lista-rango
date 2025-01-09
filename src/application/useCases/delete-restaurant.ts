import type { RestaurantRepository } from "@/domain/repositories/restaurant.repository";

export class DeleteRestaurantUseCase {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}

	async execute(restaurantId: string) {
		await this.restaurantRepository.destroy(restaurantId);
	}
}
