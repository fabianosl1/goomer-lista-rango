import type { AddressDto } from "@/restaurant/application/dtos/address.dto";

export type CreateRestaurantRequestDto = {
	name: string;
	address: AddressDto;
};
