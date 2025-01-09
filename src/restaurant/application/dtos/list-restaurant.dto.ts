import type { RestaurantResponseDto } from "@/restaurant/application/dtos/restaurant.dto";

type RestaurantItem = Omit<RestaurantResponseDto, "schedules" | "address"> & {
	address: string;
};

export type ListRestaurantResponseDto = Array<RestaurantItem>;
