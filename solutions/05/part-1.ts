import { parseInput } from ".";
import { min } from "lodash";

export async function solve() {
  const { inputSeeds, mapOfMaps } = await parseInput();

  function seedValueToLocation(seedValue: string) {
    const soil = mapOfMaps["seed-to-soil"][seedValue] || seedValue;
    const fertilizer = mapOfMaps["soil-to-fertilizer"][soil] || soil;
    const water = mapOfMaps["fertilizer-to-water"][fertilizer] || fertilizer;
    const light = mapOfMaps["water-to-light"][water] || water;
    const temperature = mapOfMaps["light-to-temperature"][light] || light;
    const humidity =
      mapOfMaps["temperature-to-humidity"][temperature] || temperature;
    const location = mapOfMaps["humidity-to-location"][humidity] || humidity;

    // console.log({
    //   seedValue,
    //   soil,
    //   fertilizer,
    //   water,
    //   light,
    //   temperature,
    //   humidity,
    //   location,
    // });

    return location;
  }

  const allLocations = inputSeeds.map(seedValueToLocation);

  console.log("seed 79", seedValueToLocation("79"));

  return min(allLocations);
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
