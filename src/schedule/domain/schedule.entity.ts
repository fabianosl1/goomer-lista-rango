export class Schedule {
	constructor(
		public id: string | null,
		public readonly begin: string,
		public readonly end: string,
		public readonly day: string,
	) {
		if (this.parseMinutes(end) - this.parseMinutes(begin) < 15) {
			throw new Error("tempo minimo de 15 minutos");
		}
	}

	private parseMinutes(input: string) {
		const regex = /^\d{2}:\d{2}$/g;

		if (!regex.test(input)) {
			throw new Error(`horario no formato incorreto: ${input}`);
		}

		const [hour, minutes] = input.split(":");

		return Number.parseInt(hour) * 60 + Number.parseInt(minutes);
	}
}
