import type { ListRestaurantResponseDto } from "@/restaurant/application/dtos/list-restaurant.dto";
import type { RestaurantRepository } from "@/restaurant/domain/restaurant.repository";

export class ListRestaurantUseCase {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}

	async execute(): Promise<ListRestaurantResponseDto> {
		const resturants = await this.restaurantRepository.list();

		return resturants.map((resturant) => ({
			id: resturant.id,
			name: resturant.name,
			picture: resturant.picture,
			address: resturant.address.toString(),
		}));
	}
}
