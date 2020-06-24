export default function CurrDate() {
	const currDate = new Date();
	const year = currDate.getFullYear();
	const month = String(currDate.getMonth() + 1).padStart(2, 0);
	const day = String(currDate.getDate()).padStart(2, 0);

	return String(day + '/' + month + '/' + year);
}
