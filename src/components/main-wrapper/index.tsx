import "./styles.css";

import Logo from "../logo";
import NavigationHeader from "../navigation-header";
import { ReactNode } from "react";
import SectionContainer from "../section-container";

type MainWrapperProps = {
  children: ReactNode;
};

export default function MainWrapper({ children }: MainWrapperProps) {
  return (
    <main className="main-wrapper">
      <SectionContainer justify="center" align="center" width="100%">
        <Logo />
      </SectionContainer>
      <SectionContainer>
        <NavigationHeader />
      </SectionContainer>
      {children}
    </main>
  );
}
