import type { AddressDto } from "@/restaurant/application/dtos/address.dto";
import type { CreateScheduleDto } from "@/schedule/application/dtos/create-schedule.dto";

export type CreateRestaurantRequestDto = {
	name: string;
	address: AddressDto;
	schedules: CreateScheduleDto[];
};
