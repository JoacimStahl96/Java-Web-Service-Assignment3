import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = () => {
	const [user, setUser] = useState({ username: "", password: "" });
	const [message, setMessage] = useState("");
	let history = useHistory();

	const changeUserData = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const registerNewUser = async (e) => {
		e.preventDefault();

		const response = await fetch("/user/register", {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.text();

		console.log(data);
		setMessage(data);
		if (response.status === 201) {
			history.push("/login");
		}
	};

	return (
		<div style={{ maxWidth: "60rem", textAlign: "center", margin: "auto" }}>
			<h1>Register</h1>
			<div>{message}</div>
			<form onSubmit={registerNewUser}>
				<input
					type="text"
					name="username"
					placeholder="Name"
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
export default Register;
