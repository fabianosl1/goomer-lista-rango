import type { AddressDto } from "@/restaurant/application/dtos/address.dto";
import type { ScheduleDto } from "@/schedule/application/dtos/schedule.dto";

export type RestaurantResponseDto = {
	id: string;
	name: string;
	picture: string | null;
	address: AddressDto;
	schedules: Array<ScheduleDto>;
};
