import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AuthProvider";

const DeletePosts = () => {
	const { globalToken, globalUsername } = useContext(AppContext);
	const [post, setPost] = useState([]);

	useEffect(() => {
		getPersonalPosts();
	}, []);

	const getPersonalPosts = async () => {
		const response = await fetch("/post/get-users-posts", {
			method: "GET",
			headers: {
				token: globalToken,
			},
		});
		const data = await response.json();
		setPost(data);
	};

	const deletePostHandler = async (title) => {
		await fetch(`/post/delete-post/${globalUsername}/${title}`, {
			method: "DELETE",
			headers: {
				token: globalToken,
			},
		});
		getPersonalPosts();
	};

	return (
		<div style={{ marginTop: "40px" }}>
			<h3 style={{ textAlign: "center" }}> Here's your post history </h3>
			<ul style={{ listStyle: "none" }}>
				{post.map((posts, index) => {
					return (
						<li
							style={{ margin: "10px", backgroundColor: "whitesmoke" }}
							key={index}
						>
							<text style={{ margin: "10px" }}>{posts.points}</text>
							<text style={{ fontWeight: "bold", margin: "10px" }}>
								{posts.title}
							</text>
							<p style={{ margin: "10px" }}>{posts.content}</p>
							<p style={{ margin: "10px" }}>Created by: {posts.username}</p>
							<button onClick={() => deletePostHandler(posts.title)}>
								Delete me
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default DeletePosts;
