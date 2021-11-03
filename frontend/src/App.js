import "./App.css";
import Navbar from "./components/fixed/Navbar";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import { BrowserRouter as Router } from "react-router-dom";
import NonPrivateRoutes from "./components/routes/NonPrivateRoutes";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import AuthenticatedNavbar from "./components/fixed/AuthenticatedNavbar";
import Posts from "./components/views/Posts";
import Post from "./components/private views/Post";
import DeletePosts from "./components/private views/DeletePosts";
import DeletePostsNavbar from "./components/fixed/DeletePostsNavbar";

function App() {
	return (
		<Router className="App">
			<NonPrivateRoutes exact path="/" component={Navbar} />
			<NonPrivateRoutes exact path="/" component={Posts} />
			<NonPrivateRoutes exact path="/r/login" component={Login} />
			<NonPrivateRoutes exact path="/r/register" component={Register} />
			<PrivateRoutes exact path="/r/posts" component={AuthenticatedNavbar} />
			<PrivateRoutes exact path="/r/posts" component={Post} />
			<PrivateRoutes exact path="/r/users-posts" component={DeletePosts} />
			<PrivateRoutes
				exact
				path="/r/users-posts"
				component={DeletePostsNavbar}
			/>
		</Router>
	);
}

export default App;
