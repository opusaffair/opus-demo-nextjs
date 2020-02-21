import "./Header.scss";
import Link from "next/link";

const Header = ({ appTitle, user, userLoading }) => (
  <div className="Header">
    <nav>
      <ul>
        <Link href="/">
          <a>{appTitle}</a>
        </Link>{" "}
        <Link href="/profile">
          <a>Profile</a>
        </Link>{" "}
        <Link href="/hello">
          <a>Hello</a>
        </Link>{" "}
        <Link href="/explore">
          <a>Explore</a>
        </Link>{" "}
        {!userLoading &&
          (user ? (
            <>
              <Link href="/api/logout">
                <a>Logout</a>
              </Link>
            </>
          ) : (
            <Link href="/api/login">
              <a>Login</a>
            </Link>
          ))}
      </ul>
    </nav>
  </div>
);

export default Header;
