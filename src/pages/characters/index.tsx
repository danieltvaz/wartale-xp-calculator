import Button from "../../components/button";
import { Character } from "../../types";
import CharacterAddModal from "../../components/character-add-modal";
import CharactersTable from "../../components/characters-table";
import MainWrapper from "../../components/main-wrapper";
import NavigationHeader from "../../components/navigation-header";
import SectionContainer from "../../components/section-container";
import charactersHandler from "../../utils/characters-handler";
import { useState } from "react";

export default function CharactersPage() {
  const { getAllCharacters, addNewCharacter } = charactersHandler();
  const [isModal, setIsModal] = useState(false);

  function handleOnAdd(character: Character) {
    addNewCharacter({
      ...character,
    });
  }

  return (
    <MainWrapper>
      <NavigationHeader />
      <CharacterAddModal visible={isModal} setVisible={setIsModal} onAdd={handleOnAdd} />
      <SectionContainer>
        <Button onClick={() => setIsModal(true)}>Adicionar</Button>
      </SectionContainer>
      <SectionContainer>
        <CharactersTable characters={getAllCharacters()} />
      </SectionContainer>
    </MainWrapper>
  );
}
