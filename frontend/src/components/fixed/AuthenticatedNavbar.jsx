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

	const routeToUsersOwnPosts = () => {
		history.push("/r/users-posts");
	};

	if (globalToken === "") {
		setAuthenticated(false);
		history.push("/");
	}

	return (
		<div>
			<button
				className="hoverButton"
				style={{
					position: "fixed",
					top: "10px",
					right: "100px",
					marginRight: "20px",
					padding: 0,
					border: "none",
				}}
				onClick={routeToUsersOwnPosts}
			>
				Watch your own posts here
			</button>
			<button
				onClick={routeToLogin}
				style={{ position: "fixed", top: "10px", right: "50px" }}
			>
				Log out
			</button>
		</div>
	);
};
export default AuthenticatedNavbar;
