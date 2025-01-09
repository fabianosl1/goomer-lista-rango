import type { CreateRestaurantDto } from "@/application/dtos/request/create-restaurant.dto";
import type { RestaurantDto } from "@/application/dtos/response/restaurant.dto";
import type { AddressDto } from "@/application/dtos/shared/address.dto";
import { Address } from "@/domain/entities/address";
import type { RestaurantRepository } from "@/domain/repositories/restaurant.repository";

export class CreateRestaurantUseCase {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}

	async execute(request: CreateRestaurantDto): Promise<RestaurantDto> {
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
