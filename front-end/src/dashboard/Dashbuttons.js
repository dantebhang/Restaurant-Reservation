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
		<div className="d-flex justify-content-center">
			<nav className="">
				<Link to={`/dashboard?date=${previous(date)}`}>
					<button className ="btn btn-secondary">Previous</button> 
				</Link>
				<Link to={`/dashboard?date=${today()}`}>
					<button className ="btn btn-secondary">Today</button>
				</Link>
				<Link to={`/dashboard?date=${next(date)}`}>
					<button className ="btn btn-secondary">Next </button>
				</Link>
			</nav>
		</div>
	);
}

export default DashButtons;
