import { CHARACTERS_STORAGE_KEY } from "../../constants/params";
import { Character } from "../../types";
import { getUniqueId } from "..";

export default function charactersHandler() {
  function addNewCharacter(character: Omit<Character, "id">) {
    const charactersStorage: Character[] | [] = JSON.parse(localStorage.getItem(CHARACTERS_STORAGE_KEY) ?? "[]");
    const newCharactersStorage = [...charactersStorage, { ...character, id: getUniqueId(charactersStorage) }];
    localStorage.setItem(CHARACTERS_STORAGE_KEY, JSON.stringify(newCharactersStorage));
  }

  function getAllCharacters() {
    const characters: Character[] | [] = JSON.parse(localStorage.getItem(CHARACTERS_STORAGE_KEY) ?? "[]");
    return characters;
  }

  function getCharacter(id: number) {
    const charactersStorage: Character[] = JSON.parse(localStorage.getItem(CHARACTERS_STORAGE_KEY) ?? "[]");
    const character = charactersStorage.find((character) => character.id === id);
    return character;
  }

  return { addNewCharacter, getAllCharacters, getCharacter };
}
