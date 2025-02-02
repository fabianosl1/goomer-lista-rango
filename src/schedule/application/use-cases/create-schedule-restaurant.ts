import type { CreateScheduleRequestDto } from "@/schedule/application/dtos/create-schedule.dto";
import { ScheduleDto } from "@/schedule/application/dtos/schedule.dto";
import { Schedule } from "@/schedule/domain/schedule.entity";
import type { ScheduleRestaurantRepository } from "@/schedule/domain/scheduleRestaurant.repository";

export class CreateScheduleRestaurantUseCase {
	constructor(
		private readonly scheduleRepository: ScheduleRestaurantRepository,
	) {}

	async execute(
		restaurantId: string,
		dto: CreateScheduleRequestDto,
	): Promise<ScheduleDto> {
		const schedule = new Schedule(null, dto.begin, dto.end, dto.day);
		await this.scheduleRepository.create(restaurantId, schedule);
		return new ScheduleDto(schedule);
	}
}
