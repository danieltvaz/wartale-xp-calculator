import { MAPS } from "../../constants/maps";

export default function mapHandler() {
  function getMapById(id: number) {
    const map = MAPS.find((map) => map.id === id);
    return map;
  }

  return { getMapById };
}
