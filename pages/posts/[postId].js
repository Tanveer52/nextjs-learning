import React from "react";
import { useRouter } from "next/router";

function PostDetail({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading........</h1>;
  }
  return (
    <div>
      <h1>Post Detail For: {post.id}</h1>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          margin: "16px auto",
          maxWidth: "600px",
          backgroundColor: "#f7f7f7",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2 style={{ fontSize: "18px", color: "#222", marginBottom: "10px" }}>
          {post.title}
        </h2>
        <p
          style={{
            color: "#555",
            whiteSpace: "pre-line",
            marginBottom: "12px",
          }}
        >
          {post.body}
        </p>
        <p style={{ fontSize: "12px", color: "#888" }}>
          User ID: {post.userId} | Post ID: {post.id}
        </p>
      </div>
    </div>
  );
}

export default PostDetail;

export async function getStaticProps(context) {
  const { params } = context;

  const { postId } = params;

  const rawData = await fetch(`http://localhost:4000/posts/${postId}`);

  if (!rawData.ok) {
    return {
      notFound: true,
    };
  }

  const data = await rawData.json();

  return {
    props: {
      post: data,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { postId: "1" },
      },
      //   {
      //     params: { postId: "2" },
      //   },
      //   {
      //     params: { postId: "3" },
      //   },
    ],
    fallback: true,
  };
}

// export async function getStaticPaths() {
//   const rawData = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const data = await rawData.json();

//   const paths = data.map((post) => {
//     return {
//       params: { postId: `${post.id}` },
//     };
//   });

//   console.log(paths);
//   return {
//     paths,
//     fallback: false,
//   };
// }
