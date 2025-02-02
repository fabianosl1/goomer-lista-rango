import {
	RestaurantItem,
	type ListRestaurantResponseDto,
} from "@/restaurant/application/dtos/list-restaurant.dto";
import type { RestaurantRepository } from "@/restaurant/domain/restaurant.repository";

export class ListRestaurantUseCase {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}

	async execute(): Promise<ListRestaurantResponseDto> {
		const resturants = await this.restaurantRepository.list();
		return resturants.map((restaurant) => new RestaurantItem(restaurant));
	}
}
