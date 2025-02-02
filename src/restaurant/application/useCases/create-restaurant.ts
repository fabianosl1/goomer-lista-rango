import type { CreateRestaurantRequestDto } from "@/restaurant/application/dtos/create-restaurant.dto";
import { RestaurantResponseDto } from "@/restaurant/application/dtos/restaurant.dto";
import { Address } from "@/restaurant/domain/address";
import { Restaurant } from "@/restaurant/domain/restaurant.entity";
import type { RestaurantRepository } from "@/restaurant/domain/restaurant.repository";
import type { ScheduleRestaurantRepository } from "@/schedule/domain/scheduleRestaurant.repository";

export class CreateRestaurantUseCase {
	constructor(
		private readonly restaurantRepository: RestaurantRepository,
		private readonly scheduleRepository: ScheduleRestaurantRepository,
	) {}

	async execute(
		dto: CreateRestaurantRequestDto,
	): Promise<RestaurantResponseDto> {
		const restaurant = this.parseEntity(dto);

		await this.restaurantRepository.save(restaurant);

		const schedules = await this.scheduleRepository.createBach(
			restaurant.id,
			dto.schedules,
		);

		return new RestaurantResponseDto(restaurant, schedules);
	}

	private parseEntity(dto: CreateRestaurantRequestDto): Restaurant {
		const { street, number, neighborhood, city, state, zipcode } = dto.address;
		const address = Address.builder()
			.withStreet(street)
			.withNumber(number)
			.withNeighborhood(neighborhood)
			.withCity(city)
			.withState(state)
			.withZipcode(zipcode)
			.build();

		return new Restaurant(null, dto.name, null, address);
	}
}
