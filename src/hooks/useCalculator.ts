import { useCallback, useEffect, useState } from "react";

import { NUMBERS } from "../constants/numbers";
import { Unit } from "../types";
import { XP_TABLE } from "../constants/xp-table";
import { xpInRealValue } from "../utils";

const RESULT_INITIAL_VALUES = {
  perMinute: 0,
  perCustomTime: 0,
  nextLevelIn: { hours: 0, minutes: 0 },
  customLevelIn: { hours: 0, minutes: 0 },
  perHour: 0,
};

const CURRENT_AND_NEXT_XP_INITIAL_VALUES = {
  level: 0,
  nextLevelXp: 0,
  totalXp: 0,
};

export default function useCalculator() {
  const [currentXp, setCurrentXp] = useState(0);
  const [targetXp, setTargetXp] = useState(0);
  const [result, setResult] = useState({
    perMinute: 0,
    perCustomTime: 0,
    nextLevelIn: { hours: 0, minutes: 0 },
    customLevelIn: { hours: 0, minutes: 0 },
    perHour: 0,
  });
  const [unit, setUnit] = useState<Unit>("unit");
  const [customLevel, setCustomLevel] = useState("");
  const [currentLevelXp, setCurrentLevelXp] = useState(CURRENT_AND_NEXT_XP_INITIAL_VALUES);
  const [nextLevelXp, setNextLevelXp] = useState(CURRENT_AND_NEXT_XP_INITIAL_VALUES);

  function allValid() {
    if (currentXp && targetXp) return true;
    else return false;
  }

  function resetAll() {
    setCurrentXp(0);
    setTargetXp(0);
    setResult(RESULT_INITIAL_VALUES);
    setUnit("unit");
    setCustomLevel("");
    setCurrentLevelXp(CURRENT_AND_NEXT_XP_INITIAL_VALUES);
    setNextLevelXp(CURRENT_AND_NEXT_XP_INITIAL_VALUES);
  }

  function getCurrentAndNextLevels() {
    try {
      const currentXpInRealValue = xpInRealValue(+currentXp, unit);

      const currentAndNextLevel = XP_TABLE.filter(
        (_, index) =>
          currentXpInRealValue > +XP_TABLE[index - 1]?.totalXp && currentXpInRealValue < +XP_TABLE[index + 1]?.totalXp
      );

      setCurrentLevelXp(currentAndNextLevel[0]);
      setNextLevelXp(currentAndNextLevel[1]);
    } catch {}
  }

  function calculateNextLevelIn() {
    try {
      const currentXpInRealValue = xpInRealValue(currentXp, unit);

      const nextLevelTotalXp = nextLevelXp.totalXp;

      const hours = ((nextLevelTotalXp - currentXpInRealValue) / result.perHour).toFixed(0);
      const minutes = (((nextLevelTotalXp - currentXpInRealValue) / result.perMinute) % 60).toFixed(0);

      setResult((values) => ({
        ...values,
        nextLevelIn: {
          hours: +hours,
          minutes: +minutes,
        },
      }));
    } catch {}
  }

  const calculateCustomLevelIn = useCallback(() => {
    try {
      const currentXpInRealValue = xpInRealValue(+currentXp, unit);
      const currentXpToTargetXpDifference = +customLevel - currentXpInRealValue;

      const hours = (currentXpToTargetXpDifference / result.perHour).toFixed(0);
      const minutes = ((currentXpToTargetXpDifference / result.perMinute) % 60).toFixed(0);

      setResult((prev) => ({ ...prev, customLevelIn: { hours: +hours, minutes: +minutes } }));
    } catch {}
  }, [currentXp, customLevel, result.perHour, result.perMinute, unit]);

  function calculateXpDiference() {
    try {
      const currentXpInRealValue = xpInRealValue(+currentXp, unit);
      const targetXpInRealValue = +targetXp * NUMBERS[unit as keyof typeof NUMBERS];
      const perMinute = targetXpInRealValue - currentXpInRealValue;

      if (perMinute > 0) {
        setResult((prev) => ({ ...prev, perMinute, perHour: perMinute * 60 }));
      }
    } catch {}
  }

  useEffect(() => {
    getCurrentAndNextLevels();
  }, [currentXp, unit]);

  useEffect(() => {
    if (result.perHour) calculateNextLevelIn();
  }, [result.perHour]);

  useEffect(() => {
    calculateCustomLevelIn();
  }, [calculateCustomLevelIn]);

  useEffect(() => {
    if (nextLevelXp?.totalXp) setCustomLevel(nextLevelXp.totalXp.toString());
  }, [nextLevelXp]);

  useEffect(() => {
    if (currentXp < targetXp) calculateXpDiference();
  }, [currentXp, targetXp]);

  return {
    currentXp,
    unit,
    targetXp,
    result,
    currentLevelXp,
    nextLevelXp,
    setCurrentXp,
    setUnit,
    setTargetXp,
    allValid,
    resetAll,
    setCustomLevel,
  };
}
