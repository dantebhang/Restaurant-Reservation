import React from "react";
import { Link } from "react-router-dom";
import { next, previous, today } from "../utils/date-time";

function DashButtons({ date }) {
	return (
		<div>
			<nav>
				<Link to={`/dashboard?date=${previous(date)}`}>
					<button class ="btn btn-secondary">Previous</button> 
				</Link>
				<Link to={`/dashboard?date=${today()}`}>
					<button class ="btn btn-secondary">Today</button>
				</Link>
				<Link to={`/dashboard?date=${next(date)}`}>
					<button class ="btn btn-secondary">Next </button>
				</Link>
			</nav>
		</div>
	);
}

export default DashButtons;
