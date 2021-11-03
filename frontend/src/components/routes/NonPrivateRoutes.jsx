import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../context/AuthProvider";

const NonPrivateRoutes = ({ component: Component, ...rest }) => {
	const { authenticated } = useContext(AppContext);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (authenticated) {
					return (
						<Redirect
							to={{ pathname: "/r/posts", state: { froms: props.location } }}
						/>
					);
				}
				return <Component {...props} />;
			}}
		/>
	);
};
export default NonPrivateRoutes;
