export default function handler(req, res) {
  return res.status(200).json({ Blog: "This is the first blog" });
}
