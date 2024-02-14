import "./styles.css";

import { Character, Map, XPHistory } from "../../types";
import CustomSelect, { CustomSelectProps } from "../custom-select";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { formatResult, timeStampToDate } from "../../utils";

import Button from "../button";
import Divider from "../divider";
import Logo from "../logo";
import { MAPS } from "../../constants/maps";
import SectionContainer from "../section-container";
import Spacer from "../spacer";
import Typography from "../typography";
import charactersHandler from "../../utils/characters-handler";

type XPHistoryModalProps = {
  onAdd?: (history: Omit<XPHistory, "id">) => any | void;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
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

export default function AddXPHistoryModal({ onAdd, visible, setVisible, xpData }: XPHistoryModalProps) {
  const { getAllCharacters } = charactersHandler();
  const [character, setCharacter] = useState(0);
  const [selectedMap, setSelectedMap] = useState(1);
  const [selectedPartySize, setSelectPartySize] = useState(1);

  function handleOnAdd() {
    onAdd?.({ ...xpData, characterId: character, map: selectedMap, partySize: selectedPartySize });
    setVisible(false);
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

  return (
    <div className={`add-xp-history-modal--wrapper add-xp-history-modal--wrapper_${visible}`}>
      <div className="add-xp-history-modal-content--wrapper">
        <SectionContainer flex={1} justify="center" align="center">
          <Logo />
        </SectionContainer>
        <SectionContainer direction="column" justify="flex-start" flex={3}>
          <SectionContainer>
            <Typography color="#fff" textAlign="left">
              Personagem:
            </Typography>
            <Spacer orientation="horizontal" />
            <CustomSelect options={charactersToSelectFactory} onChange={(e) => setCharacter(+e.currentTarget?.value)} />
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
          <Button onClick={handleOnAdd}>Salvar</Button>
          <Spacer orientation="vertical" />
          <Button onClick={() => setVisible(false)}>Cancelar</Button>
        </SectionContainer>
      </div>
    </div>
  );
}
