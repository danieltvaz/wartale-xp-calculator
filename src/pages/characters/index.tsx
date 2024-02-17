import BottomModalWrapper from "../../components/bottom-modal-wrapper";
import Button from "../../components/button";
import { Character } from "../../types";
import CharacterAddModal from "../../components/composition_character-add";
import CharactersTable from "../../components/characters-table";
import MainWrapper from "../../components/main-wrapper";
import SectionContainer from "../../components/section-container";
import charactersHandler from "../../utils/characters-handler";
import { useState } from "react";

export default function CharactersPage() {
  const { getAllCharacters, addNewCharacter, editCharacterLevel } = charactersHandler();
  const [isCharacterModal, setIsCharacterModal] = useState(false);
  const [refresh, setRefresh] = useState(0);

  function handleOnAdd(character: Omit<Character, "id">) {
    addNewCharacter({
      ...character,
    });
    setIsCharacterModal(false);
  }

  function handleOnChangeLevel(characterId: number, newLevel: number) {
    editCharacterLevel(characterId, newLevel);
    setRefresh((prev) => prev + 1);
  }

  return (
    <MainWrapper>
      <BottomModalWrapper isVisible={isCharacterModal} setIsVisible={setIsCharacterModal}>
        <CharacterAddModal onAdd={handleOnAdd} />
      </BottomModalWrapper>
      <SectionContainer>
        <Button onClick={() => setIsCharacterModal(true)}>Adicionar</Button>
      </SectionContainer>
      <SectionContainer>
        <CharactersTable characters={getAllCharacters()} onChangeLevel={handleOnChangeLevel} />
      </SectionContainer>
    </MainWrapper>
  );
}
