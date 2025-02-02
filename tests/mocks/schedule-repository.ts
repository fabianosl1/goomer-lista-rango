import type { ScheduleRestaurantRepository } from "@/schedule/domain/scheduleRestaurant.repository";

export const mockScheduleRestaurantRepository: jest.Mocked<ScheduleRestaurantRepository> =
	{
		get: jest.fn(),
		create: jest.fn(),
		destroy: jest.fn(),
		save: jest.fn(),
		listByRestaurantId: jest.fn().mockReturnValue([]),
	};

mockScheduleRestaurantRepository.create.mockImplementation(
	async (_restaurantId, data) => {
		data.id =
			mockScheduleRestaurantRepository.create.mock.calls.length.toString();
	},
);
