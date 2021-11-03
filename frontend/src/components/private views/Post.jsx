import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AuthProvider";
import Header from "../fixed/Header";

const Post = () => {
	const [post, setPost] = useState([]);

	const { globalToken, globalUsername, setAuthenticated } = useContext(
		AppContext
	);
	const [createdPost, setCreatedPost] = useState({
		title: "",
		content: "",
		points: 0,
		username: globalUsername,
	});

	useEffect(() => {
		fetchPosts();
	}, []);

	const changePostData = (e) => {
		setCreatedPost({
			...createdPost,
			[e.target.name]: e.target.value,
			username: globalUsername,
		});
	};

	const createPostHandler = (e) => {
		e.preventDefault();
		const createPost = async () => {
			await fetch("/post/create-post", {
				method: "POST",
				body: JSON.stringify(createdPost),
				headers: {
					"Content-Type": "application/json",
					token: globalToken,
				},
			});
		};

		createPost();
		fetchPosts();
	};

	const fetchPosts = async () => {
		const response = await fetch("/post/get-all-posts", {
			method: "GET",
		});
		const data = await response.json();
		setPost(data);
	};

	if (globalToken === "") {
		setAuthenticated(false);
	}

	return (
		<div>
			<Header />
			<div>
				<form className="formStyle" onSubmit={createPostHandler}>
					<input
						style={{ width: "400px" }}
						type="text"
						name="title"
						placeholder="Title"
						onChange={changePostData}
					/>
					<textarea
						style={{ height: "100px" }}
						name="content"
						placeholder="Write your content here"
						onChange={changePostData}
					/>
					<button type="submit">Send post</button>
				</form>
			</div>
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
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Post;
