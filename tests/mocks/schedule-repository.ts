import { Schedule } from "@/schedule/domain/schedule.entity";
import type { ScheduleRestaurantRepository } from "@/schedule/domain/scheduleRestaurant.repository";
import { makeSchedule } from "tests/helpers/schedule-helper";

export const mockScheduleRestaurantRepository: jest.Mocked<ScheduleRestaurantRepository> =
	{
		create: jest.fn(),
		destroy: jest.fn(),
		save: jest.fn(),
		createBach: jest.fn(),
		listByRestaurantId: jest.fn(),
	};

mockScheduleRestaurantRepository.create.mockImplementation(
	async (_restaurantId, begin, end, day) => {
		return makeSchedule({ begin, end, day });
	},
);

mockScheduleRestaurantRepository.createBach.mockImplementation(
	async (_restaurantId, schedulesDto) => {
		const schedules: Schedule[] = [];

		for (const id in schedulesDto) {
			const { begin, end, day } = schedulesDto[id];
			schedules.push(new Schedule(id, begin, end, day));
		}

		return schedules;
	},
);
