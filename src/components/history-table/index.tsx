/* eslint-disable react-hooks/rules-of-hooks */
import "./styles.css";

import React, { useMemo, useState } from "react";
import { calculateCustomLevelIn, formatResult, getNextLevels } from "../../utils";

import Button from "../button";
import CustomSelect from "../custom-select";
import Spacer from "../spacer";
import { XPHistory } from "../../types";
import { XP_TABLE } from "../../constants/xp-table";
import charactersHandler from "../../utils/characters-handler";
import mapHandler from "../../utils/map-handler";

type HistoryTableProps = {
  history: XPHistory[];
  onRemove: (history: XPHistory) => any;
};

export default function HistoryTable({ history, onRemove }: HistoryTableProps) {
  const { getCharacter } = charactersHandler();
  const { getMapById } = mapHandler();

  return (
    <>
      <div className="history-list--wrapper">
        <div className="history-list-content--wrapper">
          <table className="history-list-table">
            {history.map((history, index) => (
              <React.Fragment key={index}>
                <tr>
                  <th>NOME</th>
                  <td>{getCharacter(history?.characterId)?.name ?? ""}</td>
                </tr>
                <tr>
                  <th>LEVEL</th>
                  <td>{history.currentLevel}</td>
                </tr>
                <tr>
                  <th>CLASSE</th>
                  <td>{getCharacter(history?.characterId)?.className ?? ""}</td>
                </tr>
                <tr>
                  <th>MAPA</th>
                  <td>{`${getMapById(history.map)?.name ?? "---"}`}</td>
                </tr>
                <tr>
                  <th>PARTY</th>
                  <td>{history.partySize}</td>
                </tr>
                <tr>
                  <th>XP/M</th>
                  <td>{formatResult(history.perMinute)}</td>
                </tr>
                <tr>
                  {(() => {
                    const [customLevel, setCustomLevel] = useState(0);

                    const customLevelTime = useMemo(() => {
                      return calculateCustomLevelIn(
                        history.currentXp.toString(),
                        history.unit,
                        customLevel,
                        history.perMinute
                      );
                    }, [customLevel]);

                    return (
                      <td colSpan={2}>
                        Nível{" "}
                        <CustomSelect
                          options={getNextLevels(XP_TABLE, history.currentLevel.toString())}
                          onChange={(e) => setCustomLevel(+e?.currentTarget?.value)}
                        />{" "}
                        em {customLevelTime.hours}h {customLevelTime.minutes}m
                      </td>
                    );
                  })()}
                </tr>
                <tr>
                  <td colSpan={2}>
                    <Button onClick={() => onRemove(history)}>Remover</Button>
                  </td>
                </tr>

                <Spacer orientation="vertical" />
              </React.Fragment>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}
