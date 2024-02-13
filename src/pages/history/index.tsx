import HistoryTable from "../../components/history-table";
import MainWrapper from "../../components/main-wrapper";
import NavigationHeader from "../../components/navigation-header";
import SectionContainer from "../../components/section-container";
import historyHandler from "../../utils/history-handler";

export default function HistoryPage() {
  const { getHistory } = historyHandler();

  return (
    <MainWrapper>
      <NavigationHeader />
      <SectionContainer direction="column">
        <HistoryTable history={getHistory()} />
      </SectionContainer>
    </MainWrapper>
  );
}
