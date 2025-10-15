import React from "react";

function PostsList({ posts }) {
  return (
    <div>
      <h1>Posts LIst</h1>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            margin: "16px",
            maxWidth: "600px",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2 style={{ color: "#333", marginBottom: "8px" }}>{post.title}</h2>
          <p style={{ color: "#555", whiteSpace: "pre-line" }}>{post.body}</p>
          <p style={{ fontSize: "12px", color: "#888" }}>
            User ID: {post.userId} | Post ID: {post.id}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PostsList;

export async function getStaticProps() {
  //   const rawData = await fetch("https://jsonplaceholder.typicode.com/posts");
  const rawData = await fetch("http://localhost:4000/posts");
  console.log(rawData);
  const data = await rawData.json();

  return {
    props: {
      posts: data,
    },
    revalidate: 40,
  };
}
