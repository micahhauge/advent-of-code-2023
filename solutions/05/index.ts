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
      return {
        destStart: Number(destStart),
        sourceStart: Number(sourceStart),
        rangeLength: Number(rangeLength),
      };
    });

    function getNexValue(input: string) {
      const inputNum = Number(input);
      let output = input;

      mapValues.forEach(({ destStart, sourceStart, rangeLength }) => {
        // console.log({ input, destStart, sourceStart, rangeLength });

        const sourceEnd = sourceStart + rangeLength - 1;
        // range: 1
        // 2
        // input: 2
        if (inputNum >= sourceStart && inputNum <= sourceEnd) {
          const distanceInRange = inputNum - sourceStart;
          output = String(destStart + distanceInRange);
        }
        // console.log("no match");
      });

      return output;
    }

    return { mapName, sourceItemName, destItemName, mapValues, getNexValue };
  });

  const mapOfMaps = maps.reduce<Record<string, (input: string) => string>>(
    (acc, map) => ({ ...acc, [map.mapName]: map.getNexValue }),
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
