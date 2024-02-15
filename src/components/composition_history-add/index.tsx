import { Character, XPHistory } from "../../types";
import CustomSelect, { CustomSelectProps } from "../custom-select";
import { formatResult, timeStampToDate } from "../../utils";
import { useEffect, useMemo, useState } from "react";

import Button from "../button";
import Divider from "../divider";
import Logo from "../logo";
import { MAPS } from "../../constants/maps";
import SectionContainer from "../section-container";
import Spacer from "../spacer";
import Typography from "../typography";
import charactersHandler from "../../utils/characters-handler";

type XPHistoryModalProps = {
  onAddHistory?: (history: Omit<XPHistory, "id">) => any;
  onAddCharacter?: () => any;
  xpData: Omit<XPHistory, "id" | "characterId" | "map" | "partySize">;
  defaultCharacter?: Character;
};

const PARTY_DATA = [
  { id: 1, title: "Solo", value: 1 },
  { id: 2, title: "2", value: 2 },
  { id: 3, title: "3", value: 3 },
  { id: 4, title: "4", value: 4 },
  { id: 5, title: "5", value: 5 },
  { id: 6, title: "6", value: 6 },
] as CustomSelectProps["options"];

export default function AddXPHistoryModal({ onAddHistory, xpData, onAddCharacter }: XPHistoryModalProps) {
  const { getAllCharacters } = charactersHandler();
  const [character, setCharacter] = useState(0);
  const [selectedMap, setSelectedMap] = useState(0);
  const [selectedPartySize, setSelectPartySize] = useState(0);

  function handleOnAddHistory() {
    onAddHistory?.({ ...xpData, characterId: character, map: selectedMap, partySize: selectedPartySize });
  }

  function handleOnAddCharacter() {
    onAddCharacter?.();
  }

  const charactersToSelectFactory = useMemo(() => {
    const newCharacters = getAllCharacters().map((character) => ({
      id: character.id,
      title: character.name,
      value: character.id,
    }));
    return newCharacters;
  }, [getAllCharacters]);

  const mapsToSelectFactory = useMemo(() => {
    const newMaps = MAPS.map((map) => ({
      id: map.id,
      title: `${map.level || "0"} - ${map.name}`,
      value: map.id,
    }));
    return newMaps;
  }, []);

  const isFormValid = !!(character && selectedMap && selectedPartySize);

  useEffect(() => {
    console.log(character);
  }, [character]);

  return (
    <>
      <SectionContainer direction="column" justify="flex-start" flex={3}>
        <SectionContainer align="center">
          <Typography color="#fff" textAlign="left">
            Personagem:
          </Typography>
          <Spacer orientation="horizontal" />
          <CustomSelect options={charactersToSelectFactory} onChange={(e) => setCharacter(+e.currentTarget?.value)} />
          <Spacer orientation="horizontal" />
          <Button onClick={handleOnAddCharacter} style={{ width: "80px", height: "26px" }}>
            + Adicionar
          </Button>
        </SectionContainer>
        <Divider margin="8px" />
        <SectionContainer>
          <Typography color="#fff" textAlign="left">
            Mapa:
          </Typography>
          <Spacer orientation="horizontal" />
          <CustomSelect
            value={selectedMap}
            options={mapsToSelectFactory}
            onChange={(e) => setSelectedMap(+e.currentTarget?.value)}
          />
        </SectionContainer>
        <Divider margin="8px" />
        <SectionContainer>
          <Typography color="#fff" textAlign="left">
            Party:
          </Typography>
          <Spacer orientation="horizontal" />
          <CustomSelect options={PARTY_DATA} onChange={(e) => setSelectPartySize(+e.currentTarget?.value)} />
        </SectionContainer>
        <Divider margin="8px" />
        <SectionContainer>
          <Typography textAlign="left" color="#fff">
            Data: {timeStampToDate(new Date().getTime())}
          </Typography>
        </SectionContainer>
        <Divider margin="8px" />
        <SectionContainer>
          <Typography textAlign="left" color="#fff">
            Nível atual: {xpData.currentLevel}
          </Typography>
        </SectionContainer>
        <Divider margin="8px" />
        <SectionContainer>
          <Typography textAlign="left" color="#fff">
            XP Início: {formatResult(xpData.currentXp)}
          </Typography>
        </SectionContainer>
        <Divider margin="8px" />
        <SectionContainer>
          <Typography textAlign="left" color="#fff">
            XP Fim: {formatResult(xpData.targetXp)}
          </Typography>
        </SectionContainer>
        <Divider margin="8px" />
        <SectionContainer>
          <Typography textAlign="left" color="#fff">
            XP/Hora: {formatResult(xpData.perHour)}
          </Typography>
        </SectionContainer>
        <Divider margin="8px" />
        <SectionContainer>
          <Typography textAlign="left" color="#fff">
            XP/Minuto: {formatResult(xpData.perMinute)}
          </Typography>
        </SectionContainer>
        <Divider margin="8px" />
        <SectionContainer>
          <Typography textAlign="left" color="#fff">
            {" "}
            Próximo nível em: {xpData.nextLevelIn?.hours}H e {xpData.nextLevelIn?.minutes}M
          </Typography>
        </SectionContainer>
      </SectionContainer>
      <Divider margin="12px" />
      <SectionContainer direction="column" justify="flex-end" flex={1} align="center">
        <Button disabled={!isFormValid} onClick={handleOnAddHistory}>
          Salvar
        </Button>
      </SectionContainer>
    </>
  );
}
