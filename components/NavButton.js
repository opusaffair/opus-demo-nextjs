import Link from "next/link";
import { withRouter } from "next/router";
import "./NavButton.scss";

const NavButton = props => {
  const active = props && props.router && props.router.pathname === props.path;
  return (
    <Link href={props.path}>
      <div className={`NavButton ${active ? "active" : ""}`}>
        <div className="Icon">{props.icon}</div>
        <span className="Label">{props.label}</span>
      </div>
    </Link>
  );
};

export default withRouter(NavButton);
