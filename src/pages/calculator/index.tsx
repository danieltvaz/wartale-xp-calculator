import { formatResult, getNextLevels } from "../../utils";

import AddXPHistoryModal from "../../components/history-add-modal";
import Button from "../../components/button";
import { Character } from "../../types";
import CustomSelect from "../../components/custom-select";
import { DEFAULT_TIME } from "../../constants/params";
import Divider from "../../components/divider";
import MainWrapper from "../../components/main-wrapper";
import NavigationHeader from "../../components/navigation-header";
import SectionContainer from "../../components/section-container";
import Spacer from "../../components/spacer";
import TextInput from "../../components/text-input";
import Typography from "../../components/typography";
import { XP_TABLE } from "../../constants/xp-table";
import charactersHandler from "../../utils/characters-handler";
import historyHandler from "../../utils/history-handler";
import useCalculator from "../../hooks/useCalculator";
import useCounter from "../../hooks/useCounter";
import { useState } from "react";

function CalculatorPage() {
  const {
    currentXp,
    unit,
    targetXp,
    result,
    currentLevelXp,
    setCurrentXp,
    setUnit,
    setTargetXp,
    allValid,
    resetAll,
    setCustomLevel,
  } = useCalculator();

  const { count, clearCounter, startCounter } = useCounter();

  const { addHistory } = historyHandler();

  const [addHistoryModal, setAddHistoryModal] = useState(false);

  const { getAllCharacters, getCharacter } = charactersHandler();

  const [selectedCharacter, setSelectedCharacter] = useState<Character>();

  return (
    <MainWrapper>
      <NavigationHeader />
      <AddXPHistoryModal
        defaultCharacter={selectedCharacter}
        xpData={{
          currentLevel: currentLevelXp?.level,
          currentXp,
          nextLevelIn: result?.nextLevelIn,
          perHour: result?.perHour,
          perMinute: result?.perMinute,
          targetXp,
          unit,
          date: new Date().getTime(),
        }}
        setVisible={setAddHistoryModal}
        visible={addHistoryModal}
        onAdd={addHistory}
      />
      <SectionContainer direction="column">
        <Typography>Digite seu XP atual e clique em começar contador</Typography>
        <Spacer orientation="vertical" />
        <SectionContainer direction="row">
          <TextInput value={currentXp.toString()} onChange={(e) => setCurrentXp(+e.target.value)} type="number" />
          <Spacer orientation="horizontal" />
          <CustomSelect
            onChange={(e) => setUnit(e.currentTarget.value as "m" | "bi" | "tri" | "unit")}
            value={unit}
            options={[
              { id: "0", value: "unit", title: "Unit" },
              { id: "1", value: "m", title: "M" },
              { id: "2", value: "bi", title: "BI" },
              { id: "3", value: "tri", title: "TRI" },
            ]}
          />
        </SectionContainer>
        {!!currentLevelXp?.level && <Typography>Nível atual {currentLevelXp?.level}</Typography>}
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
        <Button onClick={() => setAddHistoryModal(true)} disabled={!allValid()}>
          Salvar
        </Button>
        <Spacer orientation="vertical" />
        <Button
          onClick={() => {
            resetAll();
            clearCounter();
          }}>
          Resetar
        </Button>
        <Spacer orientation="vertical" />
        <Spacer orientation="vertical" />
        {!!result.perMinute && (
          <>
            <Divider />
            <Typography>Você fez {formatResult(result.perMinute)} de XP por minuto</Typography>
            <Divider />
            <Typography>Em uma hora faria {formatResult(result.perHour)} de XP</Typography>
            <Divider />
            <Typography>
              Vai upar em {result.nextLevelIn.hours} horas e {result.nextLevelIn.minutes} minutos
            </Typography>
            <Divider />
            <Typography>
              Chegará no nível{" "}
              <CustomSelect
                options={getNextLevels(XP_TABLE, currentLevelXp.level.toString())}
                onChange={(e) => setCustomLevel(e.currentTarget.value)}
              />{" "}
              em {result.customLevelIn.hours} hora(s) e {result.customLevelIn.minutes} minutos
            </Typography>
          </>
        )}
      </SectionContainer>
    </MainWrapper>
  );
}

export default CalculatorPage;
