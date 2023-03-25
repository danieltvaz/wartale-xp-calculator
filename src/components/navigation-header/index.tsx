import "./styles.css";

import { Link, RouteObject } from "react-router-dom";

type NavigationHeaderProps = {
  routes: RouteObject[];
};

export default function NavigationHeader({ routes }: NavigationHeaderProps) {
  return (
    <div className="navigation-container">
      {routes.map((route, index) => (
        <Link className="link" key={`${route}-${index}`} to={route.path ?? "/"}>
          {route?.id}
        </Link>
      ))}
    </div>
  );
}
