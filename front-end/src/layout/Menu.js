import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Defines the top nav menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {


	return (
		<nav className="navbar navbar-expand navbar-light bg">
			<div
				className="collapse navbar-collapse justify-content-center "
				id="navbarNav"
			>
				<ul className="navbar-nav">
					<li className="mx-4 nav-item">
						<NavLink exact to="/dashboard" activeClassName="active-link"  >
							<p style={{ color: "white" }}>Dashboard</p>
						</NavLink>
					</li>
					<li className="mx-4 nav-item">
						<NavLink to="/search" activeClassName="active-link" >
							<p style={{ color: "white" }}>Search</p>
						</NavLink>
					</li>
					<li className="mx-4 nav-item">
						<NavLink to="/reservations/new" activeClassName="active-link" >
							<p style={{ color: "white" }}>New Reservation</p>
						</NavLink>
					</li>
					<li className="mx-4 nav-item">
						<NavLink to="/tables/new" activeClassName="active-link" >
							<p style={{ color: "white" }}>New Table</p>
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Menu;
