import React from "react";
import { next, previous, today } from "../utils/date-time";

function DashButtons({ date, setDate }) {
	const day = today();
	const prevDay = previous(date);
	const nextDay = next(date);

	return (
		<div>
			<button name="previous" onClick={() => setDate(current => previous(current) )}>
				Previous
			</button>
			<button name="today" onClick={() => setDate(today())}>
				Today
			</button>
			<button name="next" onClick={() => setDate(current => next(current))}>
				Next
			</button>
		</div>
	);
}

export default DashButtons;
