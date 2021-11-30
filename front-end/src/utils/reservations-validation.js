export function validateForm(reservation) {
	const errors = [];

	//validates reservations are made in the future
	function isFutureDate({ reservation_date, reservation_time }) {
		const dateTime = new Date(reservation_date + ' ' + reservation_time);
		if (dateTime < new Date()) {
			errors.push({ message: "Please select a future reservation date." });
		}
	}
	//reservations cannot be made on Tuesdays
	function isTuesday({ reservation_date }) {
		const day = new Date(reservation_date).getUTCDay();
		if (day === 2) {
			errors.push({ message: "Restaurant is closed on Tuesdays." });
		}
	}
	//reservation must be made 10:30am to 9:30pm time frame
	function isOpenHours({ reservation_time }) {
		const resTime = Number(reservation_time.replace(/:/g, '').slice(0, 4))
		if (resTime < 1030 || resTime > 2130){
			errors.push({message: "Reservation must be made between 10:30am and 9:30pm"})
		}
	}

	isFutureDate(reservation);
	isTuesday(reservation);
	isOpenHours(reservation);
	return errors;
}
