import { parserToMinutes } from "@/utils/hour";

export class Schedule {
	constructor(
		public readonly id: string,
		public readonly begin: string,
		public readonly end: string,
		public readonly day: string,
	) {
		if (parserToMinutes(end) - parserToMinutes(begin) < 15) {
			throw new Error("tempo minimo de 15 minutos");
		}
	}
}
