import React, { useState, useContext } from "react";
import { AppContext } from "../context/AuthProvider";

const Login = () => {
	const [user, setUser] = useState({ username: "", password: "" });
	const [message, setMessage] = useState("");
	const { setAuthenticated, setGlobalToken, setGlobalUsername } = useContext(
		AppContext
	);

	const changeUserData = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const loginUserHandler = (e) => {
		e.preventDefault();
		const loginUser = async () => {
			const response = await fetch("/user/login", {
				method: "POST",
				body: JSON.stringify(user),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status !== 200) {
				setMessage("Wrong credentials!");
			}
			if (response.status !== 406 && response.status === 200) {
				const data = await response.text();
				setGlobalToken(data);
				console.log("user.username", user.username);
				setAuthenticated(true);
				setGlobalUsername(user.username);
			}
		};
		loginUser();
	};

	return (
		<div style={{ maxWidth: "60rem", textAlign: "center", margin: "auto" }}>
			<h1>Login</h1>
			<div>{message}</div>
			<form onSubmit={loginUserHandler}>
				<input
					type="text"
					name="username"
					placeholder="Username"
					onChange={changeUserData}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={changeUserData}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};
export default Login;
