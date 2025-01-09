import type { CreateRestaurantRequestDto } from "@/restaurant/application/dtos/create-restaurant.dto";
import type { RestaurantResponseDto } from "@/restaurant/application/dtos/restaurant.dto";
import type { AddressDto } from "@/restaurant/application/dtos/address.dto";
import { Address } from "@/restaurant/domain/address";
import type { RestaurantRepository } from "@/restaurant/domain/restaurant.repository";

export class CreateRestaurantUseCase {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}

	async execute(
		request: CreateRestaurantRequestDto,
	): Promise<RestaurantResponseDto> {
		const address = this.parseAddress(request.address);

		return await this.restaurantRepository.create(request.name, address);
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
