import "./App.css";

import { useEffect, useState } from "react";

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
  const [unit, setUnit] = useState<"M" | "BI" | "Unit">("Unit");
  const [customTime, setCustomTime] = useState("16");

  function allValid() {
    if (unit && currentXp) return true;
    else return false;
  }

  function resetAll() {
    clearCounter();
    setCurrentXp("");
    setTargetXp("");
    setResult("");
    setUnit("Unit");
    setCustomTime("16");
  }

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
    const perMinuteWithoutMask = result;
    const perHourWithoutMask = String(Number(result) * 60);
    const perCustomTimeWithoutMask = String(Number(result) * 60 * Number(customTime));

    const perMinute = formatResult(result);
    const perHour = formatResult(String(Number(result) * 60));
    const perCustomTime = formatResult(String(Number(result) * 60 * Number(customTime)));

    return { perMinute, perMinuteWithoutMask, perHour, perHourWithoutMask, perCustomTime, perCustomTimeWithoutMask };
  }

  function calculateNextLevelInHour() {
    try {
      const perHour = {
        value: Number(calculateXpTimes().perHour.split(" ")[0]),
        unit: calculateXpTimes().perHour.split(" ")[1],
      } as { value: number; unit: "m" | "bi" | "tri" };

      const currentXpInRealUnitValue = Number(currentXp) * NUMBERS[unit?.toLowerCase() as keyof typeof NUMBERS];

      const perHourInRealUnitValue = perHour.value * NUMBERS[perHour.unit];

      const nextLevelXp = () => {
        const currentXpIndex = XP_TABLE.filter(
          (_, index) =>
            currentXpInRealUnitValue > +XP_TABLE[index - 1]?.totalXp &&
            currentXpInRealUnitValue < +XP_TABLE[index + 1]?.totalXp
        );
        return currentXpIndex[1].totalXp;
      };

      return (+nextLevelXp() - currentXpInRealUnitValue) / perHourInRealUnitValue;
    } catch {
      alert("valores inválidos");
    }
  }

  function calculateXpDiference() {
    const currentXpWithoutMask = Number(currentXp.replace(/[\,\.]/g, ""));
    const targetXpWithoutMask = Number(targetXp.replace(/[\,\.]/g, ""));

    setResult((targetXpWithoutMask - currentXpWithoutMask).toString());
  }

  function generateXpListForSelect() {
    const xpListForSelect = XP_TABLE.map((xpData, index) => ({
      id: index,
      value: JSON.stringify(xpData),
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
          <TextInput value={currentXp} onChange={(e) => setCurrentXp(e.target.value)} />
          <Spacer orientation="horizontal" />
          <CustomSelect
            onChange={(e) => setUnit(e.currentTarget.value as "M" | "BI")}
            value={unit}
            options={[
              { id: 0, value: undefined, title: "Unit" },
              { id: 1, value: "M", title: "M" },
              { id: 2, value: "BI", title: "BI" },
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
        <TextInput value={targetXp} onChange={(e) => setTargetXp(e.target.value)} />
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
            <Typography>Você fez {calculateXpTimes().perMinute} de XP por minuto</Typography>
            <Divider />
            <Typography>Em uma hora faria {calculateXpTimes().perHour}</Typography>
            <Divider />
            <Typography>
              Em <input className="hour-input" value={customTime} onChange={(e) => setCustomTime(e.target.value)} />{" "}
              horas faria {calculateXpTimes().perCustomTime}
            </Typography>
            <Divider />
            <Typography>Vai upar em {calculateNextLevelInHour()?.toFixed(0)} horas</Typography>
          </>
        )}
      </SectionContainer>
    </MainWrapper>
  );
}

export default App;
