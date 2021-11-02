import React, { useState, useEffect } from "react";

const Posts = () => {
	const [post, setPost] = useState([]);

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		const response = await fetch("/post/get-all-posts", {
			method: "GET",
		});
		const data = await response.json();
		setPost(data);
	};

	return (
		<div>
			<div style={{ textAlign: "center", marginTop: "40px" }}>
				tjenare nonprivate posts
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

export default Posts;
