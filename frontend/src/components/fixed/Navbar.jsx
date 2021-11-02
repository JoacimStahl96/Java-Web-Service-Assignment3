import React from "react";
import { useHistory } from "react-router-dom";

const Navbar = () => {
	let history = useHistory();

	const goToLogin = () => {
		history.push("/login");
	};

	const goToRegister = () => {
		history.push("/register");
	};

	return (
		<div style={{ position: "fixed", top: "0", right: "0" }}>
			<button onClick={goToLogin}>Log in</button>
			<button onClick={goToRegister}>Register</button>
		</div>
	);
};
export default Navbar;
