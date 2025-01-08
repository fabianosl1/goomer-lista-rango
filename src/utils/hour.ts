export function parserToMinutes(input: string) {
	const regex = /^\d{2}:\d{2}/g;

	if (!regex.test(input)) {
		throw new Error(`horario no formato incorreto: ${input}`);
	}

	const [hour, minutes] = input.split(":");

	return Number.parseInt(hour) * 60 + Number.parseInt(minutes);
}
