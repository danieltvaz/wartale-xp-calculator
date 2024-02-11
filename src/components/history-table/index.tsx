import "./styles.css";

import { XPHistory } from "../../types";
import charactersHandler from "../../utils/characters-handler";
import { formatResult } from "../../utils";

type HistoryTableProps = {
  history: XPHistory[];
};

export default function HistoryTable({ history }: HistoryTableProps) {
  const { getCharacter } = charactersHandler();
  return (
    <div className="history-list--wrapper">
      <div className="history-list-content--wrapper">
        <table className="history-list-table">
          <thead>
            <tr>
              <td>NOME</td>
              <td>LEVEL</td>
              <td>CLASSE</td>
              <td>XP/M</td>
            </tr>
          </thead>
          <tbody>
            {history.map((history, index) => (
              <tr key={index}>
                <td>{getCharacter(history?.characterId)?.name ?? ""}</td>
                <td>{history.currentLevel}</td>
                <td>{getCharacter(history?.characterId)?.className ?? ""}</td>
                <td>{formatResult(history.perMinute)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
