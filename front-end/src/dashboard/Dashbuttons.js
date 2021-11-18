import React from "react";
import { Link } from "react-router-dom";
import { next, previous, today } from "../utils/date-time";

function DashButtons({ date }) {
	return (
		<div>
			{/* <button name="previous" onClick={() => setDate(current => previous(current) )}>
				Previous
			</button>
			<button name="today" onClick={() => setDate(today())}>
				Today
			</button>
			<button name="next" onClick={() => setDate(current => next(current))}>
				Next
			</button> */}



			<nav>
				<Link to={`/dashboard?date=${previous(date)}`}>
					<button>Previous</button> 
				</Link>
				<Link to={`/dashboard?date=${today()}`}>
					<button>Today</button>
				</Link>
				<Link to={`/dashboard?date=${next(date)}`}>
					<button>Next </button>
				</Link>
			</nav>
		</div>
	);
}

export default DashButtons;
