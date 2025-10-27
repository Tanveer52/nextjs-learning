const comments = [
  {
    id: 1,
    username: "tanveer_dev",
    avatar: "https://example.com/avatars/ahmad.png",
    comment: "Great work! The UI feels really smooth 👏",
    likes: 12,
    timestamp: "2025-10-17T09:45:00Z",
  },
  {
    id: 2,
    username: "flutter_guru",
    avatar: "https://example.com/avatars/flutter.png",
    comment: "Nice use of Riverpod and clean architecture 💪",
    likes: 25,
    timestamp: "2025-10-17T09:50:00Z",
  },
  {
    id: 3,
    username: "sara.codes",
    avatar: "https://example.com/avatars/sara.png",
    comment: "Animations are super smooth — love the transitions 🔥",
    likes: 18,
    timestamp: "2025-10-17T10:02:00Z",
  },
  {
    id: 4,
    username: "muneeb_ai",
    avatar: "https://example.com/avatars/muneeb.png",
    comment: "How did you implement the AI chat feature? Looks interesting 🤖",
    likes: 8,
    timestamp: "2025-10-17T10:05:00Z",
  },
  {
    id: 5,
    username: "designby_hira",
    avatar: "https://example.com/avatars/hira.png",
    comment: "Color palette and typography are on point 🎨",
    likes: 20,
    timestamp: "2025-10-17T10:15:00Z",
  },
];

export default function handler(req, res) {
  const { method } = req;
  if (method == "GET") {
    return res.status(200).json(comments);
  } else if (method == "POST") {
    console.log(req.body);
    const comment = req.body;
    comments.push(comment);
    return res.status(201).json(comments);
  }
}
