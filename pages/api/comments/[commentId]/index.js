export default async function handler(req, res) {
  const { commentId } = req.query;
  const { method } = req;
  if (method == "DELETE") {
    const raw = await fetch("http://localhost:3000/api/comments/");
    const data = await raw.json();
    const exist = data.some((comment) => comment.id === Number(commentId));
    if (exist) {
      const updatedComments = data.filter(
        (comment) => comment.id != Number(commentId)
      );

      return res.status(200).json({ updatedComments });
    }
    return res.json({ message: "Comment not found" });
  }
}
