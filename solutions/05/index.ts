import * as one from "./part-1";
import * as two from "./part-2";

console.log(`Part 1: `, await one.solve());
// console.log(`Part 2: `, await two.solve());

export async function parseInput(example = false) {
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
      return {
        destStart: Number(destStart),
        sourceStart: Number(sourceStart),
        rangeLength: Number(rangeLength),
      };
    });

    const map: Record<string, string> = {};
    mapValues.forEach(({ destStart, sourceStart, rangeLength }) => {
      for (let i = 0; i < rangeLength; i++) {
        const dest = destStart + i;
        const source = sourceStart + i;
        map[source] = `${dest}`;
      }
    });

    return { mapName, sourceItemName, destItemName, mapValues, map };
  });

  const mapOfMaps = maps.reduce<Record<string, Record<string, string>>>(
    (acc, map) => ({ ...acc, [map.mapName]: map.map }),
    {},
  );

  return { inputSeeds, mapOfMaps };
}

export type MapName = `${ItemName}-to-${ItemName}`;

export type ItemName =
  | "seed"
  | "soil"
  | "fertilizer"
  | "water"
  | "light"
  | "temperature"
  | "humidity"
  | "locations";
