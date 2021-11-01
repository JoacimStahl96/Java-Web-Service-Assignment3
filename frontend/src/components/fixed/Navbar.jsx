import React, { useContext } from "react";
import { AppContext } from "../context/AuthProvider";
import { useHistory } from "react-router-dom";

const Navbar = () => {
	const { authenticated, setAuthenticated } = useContext(AppContext);
	let history = useHistory();

	const handleLogin = () => {
		return (
			<button
				onClick={() => setAuthenticated(false)}
				style={{ float: "right" }}
			>
				Log out
			</button>
		);
	};

	const routeToLogin = () => {
		history.push("/login");
	};

	const handleLogout = () => {
		return (
			<button onClick={routeToLogin} style={{ float: "right" }}>
				Log in
			</button>
		);
	};

	return <div>{authenticated ? handleLogout : handleLogin}</div>;
};
export default Navbar;
