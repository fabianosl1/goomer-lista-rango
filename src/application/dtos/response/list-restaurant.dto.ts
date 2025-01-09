import type { RestaurantDto } from "@/application/dtos/response/restaurant.dto";

type RestaurantItem = Omit<RestaurantDto, "schedules" | "address"> & {
	address: string;
};

export type ListRestaurantDto = Array<RestaurantItem>;
