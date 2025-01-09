import type { AddressDto } from "@/restaurant/application/dtos/address.dto";
import type { ScheduleDto } from "@/schedule/application/dtos/schedule.dto";

export type CreateRestaurantRequestDto = {
	name: string;
	address: AddressDto;
	schedules: Omit<ScheduleDto, "id">[];
};
