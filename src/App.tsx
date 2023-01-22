import "./App.css";

import { useEffect, useState } from "react";

import Button from "./components/button";
import CustomSelect from "./components/custom-select";
import Logo from "./components/logo";
import MainWrapper from "./components/main-wrapper";
import SectionContainer from "./components/section-container";
import Spacer from "./components/spacer";
import TextInput from "./components/text-input";
import Typography from "./components/typography";
import { XP_TABLE, XP_TABLE_TYPE } from "./constants/xp-table";
//@ts-ignore
import sound from "./assets/audio/alert.wav";
import useCounter from "./hooks/useCounter";

const alertSound = new Audio(sound);

const DEFAULT_TIME = 60;

function App() {
  const { count, startCounter, clearCounter } = useCounter();
  const [currentXp, setCurrentXp] = useState("");
  const [targetXp, setTargetXp] = useState("");
  const [result, setResult] = useState("");
  const [unit, setUnit] = useState<"M" | "BI">("M");
  const [customTime, setCustomTime] = useState("16");
  const [currentLevel, setCurrentLevel] = useState({} as XP_TABLE_TYPE);

  function formatResult(value: string) {
    const valueInNumber = Number(value);

    if (unit === "BI") {
      if (valueInNumber >= 1000) {
        return `${valueInNumber / 1000} tri`;
      }
      if (valueInNumber < 1000) {
        return `${valueInNumber} bi`;
      }
    }
    if (unit === "M") {
      if (valueInNumber < 1000) {
        return `${valueInNumber} m`;
      }
      if (valueInNumber >= 1000 && valueInNumber < 100000) {
        return `${valueInNumber / 1000} bi`;
      }
      if (valueInNumber >= 100000) {
        return `${valueInNumber / 100000} tri`;
      }
    }

    return result;
  }

  function calculateXpTimes() {
    const perMinute = formatResult(result);
    const perHour = formatResult(String(+result * 60));
    const perCustomTime = formatResult(String(+result * 60 * +customTime));
    const hourToNextLevel = currentLevel.

    return { perMinute, perHour, perCustomTime };
  }

  function calculateXpDiference() {
    const currentXpWithoutMask = Number(currentXp.replace(/[\,\.]/g, ""));
    const targetXpWithoutMask = Number(targetXp.replace(/[\,\.]/g, ""));

    setResult((targetXpWithoutMask - currentXpWithoutMask).toString());
  }

  function generateXpListForSelect() {
    const xpListForSelect = XP_TABLE.map((xpData, index) => ({
      id: index,
      value: xpData,
      title: xpData.level,
    }));

    return xpListForSelect;
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
          <CustomSelect
            onChange={(e) => setCurrentLevel(e.currentTarget.value as string)}
            options={[...generateXpListForSelect()]}
          />
          <Spacer orientation="horizontal" />
          <TextInput value={currentXp} onChange={(e) => setCurrentXp(e.target.value)} />
          <Spacer orientation="horizontal" />
          <CustomSelect
            onChange={(e) => setUnit(e.currentTarget.value as "M" | "BI")}
            options={[
              { id: 1, value: "M", title: "M" },
              { id: 2, value: "BI", title: "BI" },
            ]}
          />
        </SectionContainer>
        <Spacer orientation="vertical" />
        <Typography>{count} segundos restantes</Typography>
        <Spacer orientation="vertical" />
        <Button onClick={startCounter} disabled={count === 0 || count !== DEFAULT_TIME}>
          Começar contador
        </Button>
        <Spacer orientation="vertical" />
        <Button onClick={clearCounter}>Resetar contador</Button>
        <Spacer orientation="vertical" />
        <Spacer orientation="vertical" />
        <Typography>Digite seu XP no momento que o contador zerou</Typography>
        <Spacer orientation="vertical" />
        <TextInput value={targetXp} onChange={(e) => setTargetXp(e.target.value)} />
        <Spacer orientation="vertical" />
        <Button onClick={calculateXpDiference}>Calcular</Button>
        <Spacer orientation="vertical" />
        <Spacer orientation="vertical" />
        {!!result && (
          <>
            <Typography>Você fez {calculateXpTimes().perMinute} de XP por minuto</Typography>
            <Typography>Em uma hora faria {calculateXpTimes().perHour}</Typography>
            <Typography>
              Em <input className="hour-input" value={customTime} onChange={(e) => setCustomTime(e.target.value)} />{" "}
              horas faria {calculateXpTimes().perCustomTime}
            </Typography>
          </>
        )}
      </SectionContainer>
    </MainWrapper>
  );
}

export default App;
