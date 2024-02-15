import "./styles.css";

import { Link } from "react-router-dom";
import Logo from "../logo";
import SectionContainer from "../section-container";
import { router } from "../../router";

export default function NavigationHeader() {
  return (
    <>
      <div className="navigation-container">
        <Logo />
        <SectionContainer gap="8px">
          {router.routes.map((route, index) => (
            <Link className="link" key={`${route}-${index}`} to={route.path ?? "/"}>
              {route?.id}
            </Link>
          ))}
        </SectionContainer>
      </div>
    </>
  );
}
