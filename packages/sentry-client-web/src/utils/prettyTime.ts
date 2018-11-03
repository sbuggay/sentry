export function pretty(seconds: number, scale: number = 1): string {

	// Windows returns fractions of seconds, we don't care about that
	seconds = Math.floor(seconds);

	let minutes = (seconds / 60) | 0;
	seconds -= minutes * 60;

	let hours = (minutes / 60) | 0;
	minutes -= hours * 60;

	const days = (hours / 24) | 0;
	hours -= days * 24;

	// const weeks = (days / 7) | 0;
	// days -= weeks * 7;

	const times = [days, hours, minutes, seconds];

	const types = [
		"day",
		"hour",
		"minute",
		"second"
	];

	function getTimeString(value: number, index: number) {
		return `${value} ${types[index]}${value === 1 ? "" : "s"}`;
	}

	const str: string[] = [];
	times.forEach((time: number, index: number) => {
		if (time !== 0) {
			str.push(getTimeString(time, index));
		}
	});

	str.splice(scale);

	return str.join(" ");
}
