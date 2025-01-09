import type { AddressDto } from "@/application/dtos/shared/address.dto";

export type CreateRestaurantDto = {
	name: string;
	address: AddressDto;
};
