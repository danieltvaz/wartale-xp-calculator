import { Character, Class } from "../../types";

import Button from "../button";
import CustomSelect from "../custom-select";
import Divider from "../divider";
import SectionContainer from "../section-container";
import TextInput from "../text-input";
import Typography from "../typography";
import { useState } from "react";

type Props = {
  onAdd: (character: Omit<Character, "id">) => any;
};

export default function CharacterAddModal({ onAdd }: Props) {
  const [selectedClass, setSelectedClass] = useState<Class>("" as Class);
  const [characterName, setCharacterName] = useState("");
  const [characterLevel, setCharacterLevel] = useState("");

  const isFormValid = !!(selectedClass && characterName && characterLevel);

  return (
    <>
      <SectionContainer justify="center">
        <Typography color="#000">Novo personagem</Typography>
      </SectionContainer>
      <Divider margin="24px" />
      <SectionContainer justify="center">
        <CustomSelect
          defaultValue={"Classe"}
          onChange={(e) => setSelectedClass(e.currentTarget?.value as Class)}
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
        <TextInput
          placeholder="Nome"
          style={{ borderRadius: "0px" }}
          onChange={(e) => setCharacterName(e.target.value)}
          value={characterName}
        />
        <TextInput
          onChange={(e) => setCharacterLevel(e.target.value)}
          value={characterLevel}
          placeholder="Level"
          type="number"
          style={{
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
          }}
        />
      </SectionContainer>
      <Divider margin="16px" />
      <SectionContainer justify="center">
        <Button
          disabled={!isFormValid}
          onClick={() =>
            onAdd({
              name: characterName,
              className: selectedClass,
              level: +characterLevel,
            })
          }>
          Adicionar
        </Button>
      </SectionContainer>
    </>
  );
}
