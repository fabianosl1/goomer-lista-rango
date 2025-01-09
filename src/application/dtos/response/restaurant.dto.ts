import type { AddressDto } from "@/application/dtos/shared/address.dto";
import type { ScheduleDto } from "@/application/dtos/shared/schedule.dto";

export type RestaurantDto = {
	id: string;
	name: string;
	picture: string | null;
	address: AddressDto;
	schedules: Array<ScheduleDto>;
};
