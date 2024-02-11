import Divider from "../../components/divider";
import HistoryTable from "../../components/history-table";
import MainWrapper from "../../components/main-wrapper";
import NavigationHeader from "../../components/navigation-header";
import SectionContainer from "../../components/section-container";
import Spacer from "../../components/spacer";
import charactersHandler from "../../utils/characters-handler";
import { formatResult } from "../../utils";
import historyHandler from "../../utils/history-handler";

export default function HistoryPage() {
  const { getHistory } = historyHandler();
  const { getCharacter } = charactersHandler();

  return (
    <MainWrapper>
      <NavigationHeader />
      <SectionContainer direction="column">
        <HistoryTable history={getHistory()} />
      </SectionContainer>
    </MainWrapper>
  );
}
