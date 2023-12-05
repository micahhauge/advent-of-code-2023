import * as one from "./part-1";
import * as two from "./part-2";

console.log(`Part 1: `, await one.solve());
// console.log(`Part 2: `, await two.solve());

export async function parseInput(example = true) {
  const file = `${import.meta.dir}/input${example ? "-example" : ""}.txt`;
  const input = await Bun.file(file).text();

  const [rawInputSeeds, ...rawInputMaps] = input.split("\n\n");
  const inputSeeds = rawInputSeeds.split("seeds: ")[1].split(" ");
  console.log(rawInputMaps);

  const maps = rawInputMaps.map((rawInputMap) => {
    const t = rawInputMap.split("\n");
    const [rawMapName, ...rawMapValues] = t;
    const mapName = rawMapName.split(" map:")[0];
    const [sourceItemName, destItemName] = mapName.split("-to-");

    const mapValues = rawMapValues.map((rawMapValueRow) => {
      const [destStart, sourceStart, rangeLength] = rawMapValueRow.split(" ");
      return { destStart, sourceStart, rangeLength };
    });

    return { mapName, sourceItemName, destItemName, mapValues };
  });

  type MapItem = (typeof maps)[0];

  const mapOfMaps = maps.reduce<Record<string, MapItem>>(
    (acc, map) => ({ ...acc, [map.mapName]: map }),
    {},
  );

  return [inputSeeds, mapOfMaps] as [typeof inputSeeds, typeof mapOfMaps];
}

export type ItemName =
  | "seed"
  | "soil"
  | "fertilizer"
  | "water"
  | "light"
  | "temperature"
  | "humidity"
  | "locations";
