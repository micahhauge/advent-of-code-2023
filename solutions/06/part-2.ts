import { Race, parseInput } from ".";
import { map } from "lodash";

export async function solve() {
  const { races } = await parseInput();

  const waysForEachRace = races.map((r) => waysToWinRace(r));

  console.log(waysToWinRace(races[0]));

  return waysForEachRace.reduce((a, b) => a * b, 1);
}

function waysToWinRace(race: Race) {
  let ways = 0;
  for (let i = 0; i < race.time; i++) {
    if (getDistanceForTime(i, race.time) > race.distanceRecord) {
      ways++;
    }
  }
  return ways;
}

function getDistanceForTime(timeHeld: number, totalTime: number) {
  let speed = 0;
  let distance = 0;

  for (let i = 0; i < timeHeld; i++) {
    speed += 1;
  }
  const timeLeft = totalTime - timeHeld;

  for (let i = 0; i < timeLeft; i++) {
    distance += speed;
  }

  return distance;
}
