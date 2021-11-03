import React, { useContext } from "react";
import { AppContext } from "../context/AuthProvider";
import { useHistory } from "react-router-dom";

const DeletePostsNavbar = () => {
	const {
		setAuthenticated,
		setGlobalUsername,
		setGlobalToken,
		globalToken,
	} = useContext(AppContext);
	let history = useHistory();

	const routeToAllPosts = () => {
		history.push("/r/posts");
	};

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
				onClick={routeToAllPosts}
			>
				Go back to all posts
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
export default DeletePostsNavbar;
