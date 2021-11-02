import React, { useContext } from "react";
import { AppContext } from "../context/AuthProvider";
import { useHistory } from "react-router-dom";

const AuthenticatedNavbar = () => {
	const {
		setAuthenticated,
		setGlobalUsername,
		setGlobalToken,
		globalToken,
	} = useContext(AppContext);
	let history = useHistory();

	const routeToLogin = () => {
		const logOutUser = async () => {
			const response = await fetch("/user/logout", {
				method: "POST",
				headers: { token: globalToken },
			});
			if (response.status === 200) {
				setGlobalToken("");
				setGlobalUsername("");
			}
		};
		logOutUser();
	};
	if (globalToken === "") {
		setAuthenticated(false);
		history.push("/");
	}

	return (
		<button
			onClick={routeToLogin}
			style={{ position: "fixed", top: "0", right: "0" }}
		>
			Log out
		</button>
	);
};
export default AuthenticatedNavbar;
