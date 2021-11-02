import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AuthProvider = ({ children }) => {
	const [globalToken, setGlobalToken] = useState("");
	const [authenticated, setAuthenticated] = useState(false);
	const [globalUsername, setGlobalUsername] = useState("");

	return (
		<div>
			<AppContext.Provider
				value={{
					globalToken,
					setGlobalToken,
					authenticated,
					setAuthenticated,
					globalUsername,
					setGlobalUsername,
				}}
			>
				{children}
			</AppContext.Provider>
		</div>
	);
};
export default AuthProvider;
