import { AnyObjectWithId, Class, Unit } from "../types";

import { NUMBERS } from "../constants/numbers";
import { XP_TABLE_TYPE } from "../constants/xp-table";
import { lazy } from "react";

export function getNextLevels(xpTable: XP_TABLE_TYPE[], currentLevel: string) {
  const nextLevelList = xpTable
    .filter((tableData) => +tableData.level > +currentLevel)
    .map((tableData, index) => ({
      id: index + 1,
      title: tableData.level,
      value: tableData.totalXp,
    }));

  return nextLevelList;
}

export function getUniqueId(array: AnyObjectWithId[]) {
  const ids = array.map((item) => Number(item?.id));
  const newId = ids[array.length - 1] + 1;
  if (!newId) {
    return 1;
  }
  return newId;
}

export function formatResult(value: number) {
  if (value < NUMBERS.m) {
    return `${value / NUMBERS.unit}`;
  }
  if (value / NUMBERS.m < 1000) {
    return `${value / NUMBERS.m} m`;
  }
  if (value / NUMBERS.bi < 1000) {
    return `${value / NUMBERS.bi} bi`;
  }
  if (value / NUMBERS.tri < 1000) {
    return `${value / NUMBERS.tri} tri`;
  }

  return "0";
}

export function xpInRealValue(currentXp: number, unit: Unit) {
  return currentXp * NUMBERS[unit];
}

export function timeStampToDate(timestamp: number) {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.getMonth().toString().padStart(2, "0");
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} - ${hour}:${minutes}`;
}
