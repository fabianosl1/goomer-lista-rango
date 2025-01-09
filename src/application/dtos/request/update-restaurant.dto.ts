import type { AddressDto } from "@/application/dtos/shared/address.dto";
import type { Restaurant } from "@/domain/entities/restaurant.entity";

export type UpdateRestaurantDto = Partial<
	Omit<Restaurant, "id" | "schedules" | "address"> & {
		address: AddressDto;
	}
>;
