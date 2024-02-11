import "./styles.css";

import { Character, XPHistory } from "../../types";
import { Dispatch, SetStateAction, useState } from "react";
import { formatResult, timeStampToDate } from "../../utils";

import Button from "../button";
import CustomSelect from "../custom-select";
import Divider from "../divider";
import Logo from "../logo";
import SectionContainer from "../section-container";
import Spacer from "../spacer";
import charactersHandler from "../../utils/characters-handler";

type XPHistoryModalProps = {
  onAdd?: (history: Omit<XPHistory, "id">) => any | void;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  xpData: Omit<XPHistory, "id" | "characterId">;
  defaultCharacter?: Character;
};

export default function AddXPHistoryModal({
  onAdd,
  visible,
  setVisible,
  xpData,
  defaultCharacter,
}: XPHistoryModalProps) {
  const { getAllCharacters } = charactersHandler();
  const [character, setCharacter] = useState(0);

  function handleOnAdd() {
    onAdd?.({ ...xpData, characterId: character });
    setVisible(false);
  }

  function charactersToSelectFactory(characters: Character[]) {
    const newCharacters = characters.map((character, index) => ({
      id: character.id,
      title: character.name,
      value: character.id,
    }));
    return newCharacters;
  }

  console.log(defaultCharacter);

  return (
    <div className={`add-xp-history-modal--wrapper add-xp-history-modal--wrapper_${visible}`}>
      <div className="add-xp-history-modal-content--wrapper">
        <SectionContainer>
          <Logo />
        </SectionContainer>
        <SectionContainer direction="column">
          <div>
            <CustomSelect
              options={charactersToSelectFactory(getAllCharacters())}
              onChange={(e) => setCharacter(+e.currentTarget.value)}
            />
          </div>
          <Divider />
          <p>Data: {timeStampToDate((new Date().getTime() as any).date)}</p>
          <Divider />
          <p>Nível atual: {xpData.currentLevel}</p>
          <Divider />
          <p>XP atual: {formatResult(xpData.currentXp)}</p>
          <Divider />
          <p>XP alvo: {formatResult(xpData.targetXp)}</p>
          <Divider />
          <p>XP/Hora: {formatResult(xpData.perHour)}</p>
          <Divider />
          <p>XP/Minuto: {formatResult(xpData.perMinute)}</p>
          <Divider />
          <p>
            Próximo nível em: {xpData.nextLevelIn?.hours}H e {xpData.nextLevelIn?.minutes}M
          </p>
        </SectionContainer>
        <SectionContainer direction="column">
          <Button onClick={handleOnAdd}>Salvar</Button>
          <Spacer orientation="vertical" />
          <Button onClick={() => setVisible(false)}>Cancelar</Button>
        </SectionContainer>
      </div>
    </div>
  );
}
