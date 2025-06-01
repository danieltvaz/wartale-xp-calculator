import "./styles.css";

import NavigationHeader from "../navigation-header";
import { ReactNode } from "react";
import SectionContainer from "../section-container";
import Spacer from "../spacer";

type MainWrapperProps = {
  children: ReactNode;
};

export default function MainWrapper({ children }: MainWrapperProps) {
  return (
    <main className="main-wrapper">
      <SectionContainer width="100%" height="150px">
        <NavigationHeader />
        <Spacer orientation="vertical" size="180px" />
      </SectionContainer>
      {children}
    </main>
  );
}
