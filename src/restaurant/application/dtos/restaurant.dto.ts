import type { AddressDto } from "@/restaurant/application/dtos/address.dto";
import { ScheduleDto } from "@/schedule/application/dtos/schedule.dto";
import type { Restaurant } from "@/restaurant/domain/restaurant.entity";
import type { Schedule } from "@/schedule/domain/schedule.entity";

export class RestaurantResponseDto {
	public readonly id: string;
	public readonly name: string;
	public readonly picture: string | null;
	public readonly address: AddressDto;
	public readonly schedules: Array<ScheduleDto>;

	constructor(restaurant: Restaurant, schedules: Schedule[]) {
		if (restaurant.id === null) {
			throw new Error("restaurant without id");
		}

		this.id = restaurant.id;
		this.name = restaurant.name;
		this.picture = restaurant.picture;
		this.address = restaurant.address;
		this.schedules = schedules.map((schedule) => new ScheduleDto(schedule));
	}
}
