import type { ListRestaurantDto } from "@/application/dtos/response/list-restaurant.dto";
import type { RestaurantRepository } from "@/domain/repositories/restaurant.repository";

export class ListRestaurantUseCase {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}

	async execute(): Promise<ListRestaurantDto> {
		const resturants = await this.restaurantRepository.list();

		return resturants.map((resturant) => ({
			id: resturant.id,
			name: resturant.name,
			picture: resturant.picture,
			address: resturant.address.toString(),
		}));
	}
}
