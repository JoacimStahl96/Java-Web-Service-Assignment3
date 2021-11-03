import React, { useState, useContext } from "react";
import { AppContext } from "../context/AuthProvider";

const CreatePost = () => {
	const { globalToken } = useContext(AppContext);
	const [createdPost, setCreatedPost] = useState({
		title: "",
		content: "",
		points: 0,
	});
	const [message, setMessage] = useState("");
	const [post, setPost] = useState([]);

	const changePostData = (e) => {
		setCreatedPost({ ...createdPost, [e.target.name]: e.target.value });
	};

	const createPostHandler = (e) => {
		e.preventDefault();
		const createPost = async () => {
			const response = await fetch("/post/create-post", {
				method: "POST",
				body: JSON.stringify(createdPost),
				headers: {
					"Content-Type": "application/json",
					token: globalToken,
				},
			});
			if (response.status === 201) {
				const data = response.text();
				setMessage(data);
			}
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

	return (
		<div>
			<div>{message}</div>
			<form onSubmit={createPostHandler}>
				<input
					type="text"
					name="title"
					placeholder="Title"
					onChange={changePostData}
				/>
				<textarea
					name="content"
					placeholder="Write your content here"
					onChange={changePostData}
				/>
				<button type="submit">Send post</button>
			</form>
		</div>
	);
};
export default CreatePost;
