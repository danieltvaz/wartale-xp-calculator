import "./styles.css";

import { Link } from "react-router-dom";
import Logo from "../logo";
import { router } from "../../router";

export default function NavigationHeader() {
  return (
    <>
      <Logo />
      <div className="navigation-container">
        {router.routes.map((route, index) => (
          <Link className="link" key={`${route}-${index}`} to={route.path ?? "/"}>
            {route?.id}
          </Link>
        ))}
      </div>
    </>
  );
}
