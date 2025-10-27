import React, { useEffect, useState } from "react";

function formatTimestamp(iso) {
  const date = new Date(iso);
  return date.toLocaleString();
}

function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch("/api/comments");
      const data = await res.json();
      setComments(data);
    };

    fetchComments();
  }, []);

  const submitComment = async (e) => {
    e.preventDefault();
    if (comment.length > 0) {
      const res = await fetch("/api/comments", {
        method: "Post",
        body: JSON.stringify({
          id: comments.length + 1,
          username: "flutter_guru",
          avatar: "https://example.com/avatars/flutter.png",
          comment: comment,
          likes: 25,
          timestamp: "2025-10-17T09:50:00Z",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedComments = await res.json();
      setComments(updatedComments);
      setComment("");
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "24px auto",
        padding: "16px",
        fontFamily:
          'Inter, Roboto, system-ui, -apple-system, "Segoe UI", Arial',
        background: "#f7fafc",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(15,23,42,0.06)",
      }}
    >
      <h2 style={{ margin: 0, marginBottom: "12px" }}>
        Comments ({comments.length})
      </h2>
      {comments.map((c) => (
        <article
          key={c.id}
          style={{
            display: "flex",
            gap: "12px",
            padding: "12px",
            background: "#fff",
            borderRadius: "10px",
            alignItems: "flex-start",
            marginBottom: "12px",
            boxShadow: "0 2px 8px rgba(2,6,23,0.04)",
          }}
        >
          <img
            src={c.avatar}
            alt={`${c.username} avatar`}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><rect width='100%' height='100%' fill='%23e2e8f0'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-size='18' fill='%236b7280'>?</text></svg>";
            }}
          />
          <div style={{ flex: 1 }}>
            <header
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "6px",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#0f172a",
                  }}
                >
                  {c.username}
                </div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>
                  {formatTimestamp(c.timestamp)}
                </div>
              </div>
            </header>
            <div
              style={{ fontSize: "15px", color: "#0f172a", lineHeight: 1.45 }}
            >
              {c.comment}
            </div>
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  padding: "6px 10px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  background: "transparent",
                  color: "#0f172a",
                }}
              >
                ❤️ {c.likes}
              </button>
              <button
                style={{
                  padding: "6px 10px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  background: "transparent",
                  color: "#0f172a",
                }}
              >
                Reply
              </button>
              <button
                style={{
                  padding: "6px 10px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  background: "transparent",
                  color: "#64748b",
                }}
              >
                Share
              </button>
              <button
                onClick={async () => {
                  const res = await fetch(`/api/comments/${c.id}`, {
                    method: "DELETE",
                  });

                  const { updatedComments } = await res.json();

                  setComments(updatedComments);
                }}
                style={{
                  padding: "6px 10px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  background: "transparent",
                  color: "#a42428ff",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </article>
      ))}
      <div
        style={{
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "13px",
          marginTop: "8px",
        }}
      >
        End of comments
      </div>
      <h1>Post New Comment</h1>
      <div
        style={{
          maxWidth: "600px",
          margin: "30px auto",
          padding: "20px",
          background: "#f9fafb",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <h2 style={{ marginBottom: "16px", color: "#0f172a" }}>
          Post a Comment
        </h2>

        <form
          onSubmit={(e) => submitComment(e)}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              resize: "vertical",
              fontSize: "15px",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 16px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentsPage;
