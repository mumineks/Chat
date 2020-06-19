export default function CurrTime() {
	const currDate = new Date();
	const hour = currDate.getHours();
	const minutes = currDate.getMinutes() < 10 ? String(currDate.getMinutes()).padStart(2, 0) : currDate.getMinutes();
	const seconds = currDate.getSeconds() < 10 ? String(currDate.getSeconds()).padStart(2, 0) : currDate.getSeconds();
	return String(hour + ':' + minutes + ':' + seconds);
}
