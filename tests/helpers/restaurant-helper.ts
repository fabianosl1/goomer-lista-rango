import { CreateRestaurantRequestDto } from "@/restaurant/application/dtos/create-restaurant.dto";
import { Address } from "@/restaurant/domain/address";
import { Restaurant } from "@/restaurant/domain/restaurant.entity";

export function makeRestaurant(data: {
	id?: string;
	picture?: string | null;
	name: string;
	address: Address;
}) {
	const { city, neighborhood, number, state, street, zipcode } = data.address;
	const { id, picture, name } = data;

	const address = Address.builder()
		.withStreet(street)
		.withCity(city)
		.withNumber(number)
		.withNeighborhood(neighborhood)
		.withState(state)
		.withZipcode(zipcode)
		.build();

	return new Restaurant(id ?? "1", name, picture ?? null, address);
}

export function makeCreateRestaurantDto(
	input?: Partial<CreateRestaurantRequestDto>,
): CreateRestaurantRequestDto {
	const dto = {
		name: "rango brabo",
		schedules: [],
		address: {
			city: "Rio de Janeiro",
			street: "rua da luz",
			number: null,
			state: "RJ",
			neighborhood: "centro",
			zipcode: "000001",
		},
	};

	Object.assign(dto, input);

	return dto;
}
