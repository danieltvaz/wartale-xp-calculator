import { Character, Class } from "../../types";

import CustomSelect from "../custom-select";
import SectionContainer from "../section-container";
import TextInput from "../text-input";

type Props = {
  onAdd: (character: Character) => any;
};

export default function CharacterAddModal({ onAdd }: Props) {
  function handleClassChange(charClass: Class) {}

  return (
    <>
      <SectionContainer>
        <CustomSelect
          defaultValue={"Classe"}
          onChange={(e) => handleClassChange(e.currentTarget?.value as Class)}
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
      </SectionContainer>
      <SectionContainer>
        <TextInput placeholder="Nome" />
      </SectionContainer>
    </>
  );
}
