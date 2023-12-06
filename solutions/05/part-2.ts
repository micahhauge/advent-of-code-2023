import { parseInput } from ".";
import { chunk } from "lodash";

export async function solve() {
  console.log("solving part 2...");
  const { inputSeeds, mapOfMaps } = await parseInput();

  const inputSeedNumbers = inputSeeds.map((i) => Number(i));
  const inputSeedPairs = chunk(inputSeedNumbers, 2);
  let minLocation = Number.POSITIVE_INFINITY;

  console.log(`processing ${inputSeedPairs.length} pairs...`);

  for (let i = 0; i < inputSeedPairs.length; i++) {
    const seedStart = inputSeedPairs[i][0];
    const count = inputSeedPairs[i][1];

    console.log(
      `Processing seed pair ${i}: ${JSON.stringify({ seedStart, count })}`,
    );

    for (let j = 0; j <= count; j++) {
      const location = seedValueToLocation(String(seedStart + j));
      const locNum = Number(location);
      if (locNum < minLocation) {
        minLocation = locNum;
      }
    }
  }

  function seedValueToLocation(seedValue: string) {
    const soil = mapOfMaps["seed-to-soil"](seedValue);
    const fertilizer = mapOfMaps["soil-to-fertilizer"](soil);
    const water = mapOfMaps["fertilizer-to-water"](fertilizer);
    const light = mapOfMaps["water-to-light"](water);
    const temperature = mapOfMaps["light-to-temperature"](light);
    const humidity = mapOfMaps["temperature-to-humidity"](temperature);
    const location = mapOfMaps["humidity-to-location"](humidity);

    return location;
  }

  return minLocation;
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
