import UserButton from "@/components/user_button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Screen</h1>
      <UserButton />
      <ul>
        <li>
          <Link legacyBehavior href="/blog">
            <a>Blog</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/blog/first">
            <a>First Blog</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/blog/second">
            <a>2nd Blog</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/docs/auth/google/2factor" replace>
            <a>Docs</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
