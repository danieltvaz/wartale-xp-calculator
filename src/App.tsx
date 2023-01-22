import "./App.css";

import { useCallback, useEffect, useState } from "react";

import Button from "./components/button";
import CustomSelect from "./components/custom-select";
import Divider from "./components/divider";
import Logo from "./components/logo";
import MainWrapper from "./components/main-wrapper";
import { NUMBERS } from "./constants/numbers";
import SectionContainer from "./components/section-container";
import Spacer from "./components/spacer";
import TextInput from "./components/text-input";
import Typography from "./components/typography";
import { XP_TABLE } from "./constants/xp-table";
import sound from "./assets/audio/alert.wav";
import useCounter from "./hooks/useCounter";

const alertSound = new Audio(sound);

const DEFAULT_TIME = 60;

function App() {
  const { count, startCounter, clearCounter } = useCounter();
  const [currentXp, setCurrentXp] = useState(0);
  const [targetXp, setTargetXp] = useState(0);
  const [result, setResult] = useState(0);
  const [unit, setUnit] = useState<"m" | "bi" | "Unit">("Unit");
  const [customTime, setCustomTime] = useState(16);
  const [customLevel, setCustomLevel] = useState("");

  function allValid() {
    if (unit !== "Unit" && currentXp && targetXp) return true;
    else return false;
  }

  function resetAll() {
    clearCounter();
    setCurrentXp(0);
    setTargetXp(0);
    setResult(0);
    setUnit("Unit");
    setCustomTime(0);
  }

  function formatResult(value: number) {
    if (value / NUMBERS.m < 1000) {
      return `${value / NUMBERS.m} m`;
    }
    if (value / NUMBERS.bi < 1000) {
      return `${value / NUMBERS.bi} bi`;
    }
    if (value / NUMBERS.tri < 1000) {
      return `${value / NUMBERS.tri} tri`;
    }
  }

  function getCurrentAndNextLevels() {
    const currentXpInRealValue = +currentXp * NUMBERS[unit as keyof typeof NUMBERS];

    const currentAndNextLevel = XP_TABLE.filter(
      (_, index) =>
        currentXpInRealValue > +XP_TABLE[index - 1]?.totalXp && currentXpInRealValue < +XP_TABLE[index + 1]?.totalXp
    );

    return { currentLevel: currentAndNextLevel[0], nextLevel: currentAndNextLevel[1] };
  }

  function calculateNextLevelInHour() {
    try {
      const currentXpInRealValue = +currentXp * NUMBERS[unit as keyof typeof NUMBERS];

      const nextLevelTotalXp = +getCurrentAndNextLevels().nextLevel.totalXp;

      const hours = ((nextLevelTotalXp - currentXpInRealValue) / result / 60).toFixed(0);
      const minutes = (((nextLevelTotalXp - currentXpInRealValue) / result) % 60).toFixed(0);

      return { hours, minutes };
    } catch {
      alert("valores inválidos");
    }
  }

  function calculateCustomLevel() {
    try {
      const currentXpInRealValue = +currentXp * NUMBERS[unit as keyof typeof NUMBERS];

      const nextLevelTotalXp = +customLevel ? +customLevel : +getCurrentAndNextLevels()?.nextLevel?.totalXp;

      const hours = ((nextLevelTotalXp - currentXpInRealValue) / result / 60).toFixed(0);
      const minutes = (((nextLevelTotalXp - currentXpInRealValue) / result) % 60).toFixed(0);

      return { hours, minutes };
    } catch {
      alert("valores inválidos");
    }
  }

  function calculateXpDiference() {
    const currentXpInRealValue = +currentXp * NUMBERS[unit as keyof typeof NUMBERS];
    const targetXpInRealValue = +targetXp * NUMBERS[unit as keyof typeof NUMBERS];
    setResult(targetXpInRealValue - currentXpInRealValue);
  }

  useEffect(() => {
    if (!count) {
      alertSound.play();
    }
  }, [count]);

  return (
    <MainWrapper>
      <Logo />
      <SectionContainer direction="column">
        <Typography>Digite seu XP atual e clique em começar contador</Typography>
        <Spacer orientation="vertical" />
        <SectionContainer direction="row">
          <TextInput value={currentXp.toString()} onChange={(e) => setCurrentXp(+e.target.value)} type="number" />
          <Spacer orientation="horizontal" />
          <CustomSelect
            onChange={(e) => setUnit(e.currentTarget.value as "m" | "bi")}
            value={unit}
            options={[
              { id: 0, value: undefined, title: "Unit" },
              { id: 1, value: "m", title: "M" },
              { id: 2, value: "bi", title: "BI" },
            ]}
          />
        </SectionContainer>
        <Spacer orientation="vertical" />
        <Typography>{count} segundos restantes</Typography>
        <Spacer orientation="vertical" />
        <Button onClick={startCounter} disabled={count === 0 || count !== DEFAULT_TIME || !currentXp}>
          Começar contador
        </Button>

        <Spacer orientation="vertical" />
        <Typography>Digite seu XP no momento que o contador zerou</Typography>
        <Spacer orientation="vertical" />
        <TextInput value={targetXp.toString()} onChange={(e) => setTargetXp(+e.target.value)} type="number" />
        <Spacer orientation="vertical" />
        <Button onClick={calculateXpDiference} disabled={!allValid()}>
          Calcular
        </Button>
        <Spacer orientation="vertical" />

        <Button onClick={resetAll}>Resetar</Button>
        <Spacer orientation="vertical" />
        <Spacer orientation="vertical" />
        {!!result && (
          <>
            <Typography>Nível atual {getCurrentAndNextLevels().currentLevel.level}</Typography>
            <Divider />
            <Typography>Você fez {formatResult(result)} de XP por minuto</Typography>
            <Divider />
            <Typography>Em uma hora faria {formatResult(result * 60)}</Typography>
            <Divider />
            <Typography>
              Vai upar em {calculateNextLevelInHour()?.hours} horas e {calculateNextLevelInHour()?.minutes} minutos
            </Typography>
            <Divider />
            <Typography>
              Em{" "}
              <input className="hour-input" value={customTime} onChange={(e) => setCustomTime(+e.target.value ?? 0)} />{" "}
              hora(s) faria {formatResult(result * 60 * customTime)}
            </Typography>
            <Divider />
            <Typography>
              Chegará no nível {/* @ts-ignore */}
              <CustomSelect
                options={XP_TABLE.filter(
                  (tableData) => +tableData.level > +getCurrentAndNextLevels().currentLevel.level
                ).map((tableData, index) => ({
                  id: index + 1,
                  title: tableData.level,
                  value: tableData.totalXp,
                }))}
                onChange={(e) => setCustomLevel(e.currentTarget.value)}
              />{" "}
              em {calculateCustomLevel()?.hours} hora(s) e {calculateCustomLevel()?.minutes} minutos
            </Typography>
          </>
        )}
      </SectionContainer>
    </MainWrapper>
  );
}

export default App;
