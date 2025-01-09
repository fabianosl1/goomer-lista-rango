import type { AddressDto } from "@/restaurant/application/dtos/address.dto";
import type { CreateRestaurantRequestDto } from "@/restaurant/application/dtos/create-restaurant.dto";
import type { RestaurantResponseDto } from "@/restaurant/application/dtos/restaurant.dto";
import { Address } from "@/restaurant/domain/address";
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
		const address = this.parseAddress(dto.address);
		const resturant = await this.restaurantRepository.create(dto.name, address);
		const schedules = await this.scheduleRepository.createBach(
			resturant.id,
			dto.schedules,
		);

		return {
			...resturant,
			schedules,
		};
	}

	private parseAddress({
		street,
		number,
		neighborhood,
		city,
		state,
		zipcode,
	}: AddressDto) {
		return Address.builder()
			.withStreet(street)
			.withNumber(number)
			.withNeighborhood(neighborhood)
			.withCity(city)
			.withState(state)
			.withZipcode(zipcode)
			.build();
	}
}
