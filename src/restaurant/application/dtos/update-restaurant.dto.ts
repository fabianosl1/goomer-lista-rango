import type { AddressDto } from "@/restaurant/application/dtos/address.dto";
import type { Restaurant } from "@/restaurant/domain/restaurant.entity";

export type UpdateRestaurantRequestDto = Partial<
	Omit<Restaurant, "id" | "schedules" | "address"> & {
		address: AddressDto;
	}
>;
