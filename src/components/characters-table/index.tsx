import "./styles.css";

import { Character } from "../../types";
import React from "react";

type CharactersTableProps = {
  characters: Character[];
  onSelect?: (character: Character) => any | void;
};

const IMAGES = {
  ATA: require("../../assets/class-icon/ATA.png"),
  AS: require("../../assets/class-icon/AS.png"),
  MS: require("../../assets/class-icon/MS.png"),
  MGS: require("../../assets/class-icon/MGS.png"),
  KS: require("../../assets/class-icon/KS.png"),
  FS: require("../../assets/class-icon/FS.png"),
  SS: require("../../assets/class-icon/SS.png"),
  PRS: require("../../assets/class-icon/PRS.png"),
  ASS: require("../../assets/class-icon/ASS.png"),
  BS: require("../../assets/class-icon/BS.png"),
};

export default function CharactersTable({ characters, onSelect }: CharactersTableProps) {
  return (
    <table className="character-table" cellSpacing="4">
      <thead>
        <tr>
          <td>CLASSE</td>
          <td>NOME</td>
          <td>LEVEL</td>
        </tr>
      </thead>
      <tbody>
        {characters.map((character, index) => (
          <React.Fragment key={index}>
            <tr onClick={() => onSelect?.(character)}>
              <td>
                {IMAGES[character.className] && <img className="character-icon" src={IMAGES[character.className]} />}
              </td>
              <td>
                <span>{character.name}</span>
              </td>
              <td>
                <span>{character.level}</span>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
