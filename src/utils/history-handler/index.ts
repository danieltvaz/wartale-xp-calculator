import { HISTORY_STORAGE_KEY } from "../../constants/params";
import { XPHistory } from "../../types";
import { getUniqueId } from "../../utils";

export default function historyHandler() {
  function getHistory(): XPHistory[] | [] {
    return JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) ?? "[]");
  }

  function addHistory(data: Omit<XPHistory, "id">) {
    const newHistoryEntry = { ...data };
    const newHistory = [...getHistory(), { ...newHistoryEntry, id: getUniqueId(getHistory()) }];

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
  }

  function deleteHistory(id: number) {
    const newHistory = getHistory().filter((history) => history.id !== id);

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
  }

  return { getHistory, addHistory, deleteHistory };
}
