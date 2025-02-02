import type { ScheduleRestaurantRepository } from "@/schedule/domain/scheduleRestaurant.repository";

export const mockScheduleRestaurantRepository: jest.Mocked<ScheduleRestaurantRepository> =
	{
		create: jest.fn(),
		destroy: jest.fn(),
		save: jest.fn(),
		listByRestaurantId: jest.fn().mockReturnValue([]),
	};

mockScheduleRestaurantRepository.create.mockImplementation(
	async (_restaurantId, data) => {
		if (Array.isArray(data)) {
			for (let i = 0; i < data.length; i++) {
				data[i].id = i.toString();
			}
		}
	},
);
