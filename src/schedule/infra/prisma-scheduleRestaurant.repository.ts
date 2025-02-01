import { Schedule } from "@/schedule/domain/schedule.entity";
import type { ScheduleRestaurantRepository } from "@/schedule/domain/scheduleRestaurant.repository";
import { Prisma, PrismaClient, type ScheduleRestaurant } from "@prisma/client";

export class PrismaScheduleRestaurantRepository
	implements ScheduleRestaurantRepository
{
	private readonly prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	create(
		restaurantId: string,
		begin: string,
		end: string,
		day: string,
	): Promise<Schedule> {
		throw new Error("Method not implemented.");
	}

	async createBach(
		restaurantId: string,
		schedules: Omit<Schedule, "id">[],
	): Promise<Schedule[]> {
		if (schedules.length === 0) {
			return [];
		}

		const response = await this.prisma.$queryRaw<ScheduleRestaurant[]>`
			insert into "restaurant_schedules" ("begin", "end", "day", restaurant_id) 
			values ${Prisma.join(
				schedules.map((schedule) =>
					Prisma.join(
						[
							schedule.begin,
							schedule.end,
							schedule.day,
							Number.parseInt(restaurantId),
						],
						",",
						"(",
						")",
					),
				),
			)}
			returning *
		`;

		return response.map(
			({ id, begin, end, day }) => new Schedule(id.toString(), begin, end, day),
		);
	}

	async listByRestaurantId(restaurantId: string): Promise<Schedule[]> {
		const schedules = await this.prisma.$queryRaw<ScheduleRestaurant[]>`
			select * from restaurant_schedules
			where restaurant_id = ${Number.parseInt(restaurantId)}
		`;

		return schedules.map(
			({ id, begin, end, day }) => new Schedule(id.toString(), begin, end, day),
		);
	}

	save(schedule: Schedule): Promise<Schedule> {
		throw new Error("Method not implemented.");
	}

	destroy(scheduleId: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
