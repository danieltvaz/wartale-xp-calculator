import { Character, XPHistory } from "../../types";
import { formatResult, getNextLevels } from "../../utils";

import AddXPHistoryModal from "../../components/composition_history-add";
import BottomModalWrapper from "../../components/bottom-modal-wrapper";
import Button from "../../components/button";
import CharacterAddModal from "../../components/composition_character-add";
import CustomSelect from "../../components/custom-select";
import { DEFAULT_TIME } from "../../constants/params";
import Divider from "../../components/divider";
import Logo from "../../components/logo";
import MainWrapper from "../../components/main-wrapper";
import ModalWrapper from "../../components/modal-wrapper";
import NavigationHeader from "../../components/navigation-header";
import SectionContainer from "../../components/section-container";
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
  const { addNewCharacter } = charactersHandler();

  const [addHistoryModal, setAddHistoryModal] = useState(false);
  const [addCharacterModal, setAddCharacterModal] = useState(false);

  function onAddCharacterHandler(character: Omit<Character, "id">) {
    addNewCharacter(character);
    setAddCharacterModal(false);
  }

  function onAddHistoryHandler(history: Omit<XPHistory, "id">) {
    addHistory(history);
    setAddHistoryModal(false);
  }

  return (
    <MainWrapper>
      <ModalWrapper isVisible={addHistoryModal} setIsVisible={setAddHistoryModal} zIndex={1}>
        <AddXPHistoryModal
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
          onAddHistory={onAddHistoryHandler}
          onAddCharacter={() => setAddCharacterModal(true)}
        />
      </ModalWrapper>
      <BottomModalWrapper isVisible={addCharacterModal} setIsVisible={setAddCharacterModal} zIndex={2}>
        <CharacterAddModal onAdd={onAddCharacterHandler} />
      </BottomModalWrapper>
      <SectionContainer justify="center" align="center" width="100%">
        <Logo />
      </SectionContainer>
      <SectionContainer>
        <NavigationHeader />
      </SectionContainer>
      <Divider margin="24px" />
      <SectionContainer direction="column" flex={1} width="100%">
        <SectionContainer direction="row" justify="flex-start" gap="12px" align="center" width="100%">
          <TextInput
            value={currentXp.toString()}
            onChange={(e) => setCurrentXp(+e.target?.value)}
            type="number"
            placeholder="XP Início"
          />

          <CustomSelect
            onChange={(e) => setUnit(e.currentTarget?.value as "m" | "bi" | "tri" | "unit")}
            value={unit}
            options={[
              { id: "0", value: "unit", title: "Unidade" },
              { id: "1", value: "m", title: "M" },
              { id: "2", value: "bi", title: "BI" },
              { id: "3", value: "tri", title: "TRI" },
            ]}
          />
          {<Typography>Level {(currentLevelXp?.level.toString() ?? "- - -").padStart(3, "0")}</Typography>}
        </SectionContainer>
        <Divider margin="12px" />
        <SectionContainer justify="flex-start" gap="24px" align="center" width="100%">
          <Typography>{count} segundos</Typography>
          <Button onClick={startCounter} disabled={count === 0 || count !== DEFAULT_TIME || !currentXp}>
            Começar contador
          </Button>
        </SectionContainer>
        <Divider margin="12px" />
        <SectionContainer justify="flex-start" gap="24px" align="center" direction="row" width="100%">
          <TextInput
            value={targetXp.toString()}
            onChange={(e) => setTargetXp(+e.target?.value)}
            type="number"
            placeholder="XP Fim"
          />
          <Typography>XP Final</Typography>
        </SectionContainer>
        <Divider margin="12px" />
        <SectionContainer justify="flex-start" gap="24px" align="flex-start" direction="column" width="100%">
          {!!result.perMinute && (
            <>
              <Typography>Você fez {formatResult(result.perMinute)} de XP por minuto</Typography>
              <Typography>Em uma hora faria {formatResult(result.perHour)} de XP</Typography>
              <Typography>
                Vai upar em {result.nextLevelIn.hours} horas e {result.nextLevelIn.minutes} minutos
              </Typography>
              <Typography>
                Chegará no nível{" "}
                <CustomSelect
                  options={getNextLevels(XP_TABLE, currentLevelXp?.level?.toString())}
                  onChange={(e) => setCustomLevel(e.currentTarget?.value)}
                />{" "}
                em {result.customLevelIn.hours}h e {result.customLevelIn.minutes}m
              </Typography>
            </>
          )}
        </SectionContainer>
      </SectionContainer>
      <SectionContainer flex={2} direction="row" gap="12px" width="100%" justify="center" align="center">
        <Button onClick={() => setAddHistoryModal(true)} disabled={!allValid()}>
          Salvar
        </Button>
        <Button
          onClick={() => {
            resetAll();
            clearCounter();
          }}>
          Resetar
        </Button>
      </SectionContainer>
    </MainWrapper>
  );
}

export default CalculatorPage;
