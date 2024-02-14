import HistoryTable from "../../components/history-table";
import MainWrapper from "../../components/main-wrapper";
import SectionContainer from "../../components/section-container";
import { XPHistory } from "../../types";
import historyHandler from "../../utils/history-handler";
import { useState } from "react";

export default function HistoryPage() {
  const { getHistory, deleteHistory } = historyHandler();
  const [history, setHistory] = useState<XPHistory[]>(getHistory());

  function handleOnRemove(history: XPHistory) {
    deleteHistory(history.id);
    refetchHistory();
  }

  function refetchHistory() {
    setHistory(getHistory());
  }

  return (
    <MainWrapper>
      <SectionContainer direction="column">
        <HistoryTable history={history} onRemove={handleOnRemove} />
      </SectionContainer>
    </MainWrapper>
  );
}
