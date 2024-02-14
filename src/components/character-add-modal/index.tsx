import "./styles.css";

import { Character, Class } from "../../types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Button from "../button";
import CustomSelect from "../custom-select";
import Logo from "../logo";
import SectionContainer from "../section-container";
import Spacer from "../spacer";
import TextInput from "../text-input";

type CharacterAddModalProps = {
  onAdd: (character: Character) => any | void;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const CHARACTER_INITIAL_VALUE = {
  className: "" as Class,
  level: 0,
  name: "",
  id: 0,
};

export default function CharacterAddModal({ onAdd, visible, setVisible }: CharacterAddModalProps) {
  const [character, setCharacter] = useState<Character>(CHARACTER_INITIAL_VALUE);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  function isCharacterNotValid() {
    if (!!character.className && !!character.level && !!character.name) return false;
    return true;
  }

  function handleChange(className: Class) {
    setCharacter((character) => ({ ...character, className }));
  }

  function handleOnAdd() {
    onAdd(character);
    setVisible(false);
    setCharacter(CHARACTER_INITIAL_VALUE);
  }

  useEffect(() => {
    setButtonDisabled(isCharacterNotValid());
  }, [character]);

  return (
    <div className={`character_add_modal--wrapper character_add_modal--${visible}`}>
      <div className="character_add_modal--content_wrapper">
        <Logo />
        <SectionContainer direction="column">
          <label>Classe</label>
          <CustomSelect
            defaultValue={"Classe"}
            onChange={(e) => handleChange(e.currentTarget?.value as Class)}
            options={[
              {
                id: 0,
                title: "Classe",
                value: "",
              },
              {
                id: 1,
                title: "ATA",
                value: "ATA",
              },
              {
                id: 2,
                title: "AS",
                value: "AS",
              },
              {
                id: 3,
                title: "MS",
                value: "MS",
              },
              {
                id: 4,
                title: "MGS",
                value: "MGS",
              },
              {
                id: 5,
                title: "KS",
                value: "KS",
              },
              {
                id: 6,
                title: "FS",
                value: "FS",
              },
              {
                id: 7,
                title: "SS",
                value: "SS",
              },
              {
                id: 8,
                title: "PRS",
                value: "PRS",
              },
              {
                id: 9,
                title: "ASS",
                value: "ASS",
              },
              {
                id: 10,
                title: "BS",
                value: "BS",
              },
            ]}
          />
          <Spacer orientation="vertical" />
          <label>Nome</label>
          <TextInput
            value={character.name}
            onChange={(e) => setCharacter((character) => ({ ...character, name: e.target?.value }))}
          />
          <Spacer orientation="vertical" />
          <label>Level</label>
          <TextInput
            value={character.level}
            onChange={(e) => setCharacter((character) => ({ ...character, level: +e.target?.value }))}
          />
        </SectionContainer>
      </div>
      <div className="character_add_modal--buttons_wrapper">
        <Button onClick={handleOnAdd} disabled={buttonDisabled}>
          Salvar
        </Button>
        <Button onClick={() => setVisible(false)}>Cancelar</Button>
      </div>
    </div>
  );
}
