import React from "react";
import { Link } from "react-router-dom";
import { next, previous, today } from "../utils/date-time";
/**
 * Defines the buttons on dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 * loads dashboard buttons to scroll through previous, present or future reservations
 */

function DashButtons({ date }) {
	return (
		<div>
			<nav>
					<Link to={`/dashboard?date=${today()}`}>
					<button className="mx-3 btn btn-sm btn-outline" style={{color: '#88439a'}}>Today</button>
				</Link>
				<Link to={`/dashboard?date=${previous(date)}`}>
				<span className="mx-3 oi oi-chevron-left" style={{color: '#88439a'}}></span>
				</Link>
			
				<Link to={`/dashboard?date=${next(date)}`}>
				<span className="mx-3 oi oi-chevron-right" style={{color: '#88439a'}}></span>
				</Link>
			</nav>
		</div>
	);
}

export default DashButtons;
