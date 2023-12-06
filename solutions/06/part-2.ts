import { Race, parseInput } from ".";
import { map, max, range, difference } from "lodash";

export async function solve() {
  const { races } = await parseInput();
  const race = races[0];

  const times = range(0, race.time + 1);
  const fastestTime = fastestTimeBinarySearch(times);

  const rightTime = getRightTime(fastestTime);
  const leftTime = getLeftTime(fastestTime);

  const solutionCount =
    getRightTime(fastestTime) - getLeftTime(fastestTime) + 1;

  console.table({ leftTime, rightTime, solutionCount });

  function getLeftTime(fastestTime: number) {
    let time = fastestTime;
    while (distance(time) > race.distanceRecord) {
      time--;
    }
    return time + 1;
  }

  function getRightTime(fastestTime: number) {
    let time = fastestTime;
    while (distance(time) > race.distanceRecord) {
      time++;
    }
    return time - 1;
  }

  function fastestTimeBinarySearch(times: number[]) {
    let left: number = 0;
    let right: number = times.length - 1;

    while (left !== right) {
      const mid: number = Math.floor((left + right) / 2);

      if (distance(times[mid]) < distance(times[mid + 1])) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }

  function distance(waitTime: number) {
    return getDistanceForTime(waitTime, race.time);
  }

  return solutionCount;
}

function getFastestSolution(race: Race) {
  // let left: number = 0;
  // let right:
  // const times = range(race.time);
}

// function fastestWayToWin(race: Race) {
//   const minHoldTime = 0;
//   const maxHoldTime = race.time;
//   const middleHoldTime = Math.floor((maxHoldTime - minHoldTime) / 2);

//   const rightMiddleHoldTime = middleHoldTime + maxHoldTime / 4;
//   const leftMiddleHoldTime = middleHoldTime - maxHoldTime / 4;

//   const betterHoldTime =
//     getDistanceForTime(rightMiddleHoldTime, race.time) >
//     getDistanceForTime(leftMiddleHoldTime, race.time)
//       ? rightMiddleHoldTime
//       : leftMiddleHoldTime;
// }

// function binarySearchHoldTimes(
//   minHoldTime: number,
//   maxHoldTime: number,
//   raceTime: number,
// ) {
//   const middleHoldTime = Math.floor((maxHoldTime - minHoldTime) / 2);
//   const rightHoldTime = middleHoldTime + maxHoldTime / 4;
//   const leftHoldTime = middleHoldTime - maxHoldTime / 4;

//   const betterHoldTime =
//     getDistanceForTime(rightHoldTime, raceTime) >
//     getDistanceForTime(leftHoldTime, raceTime)
//       ? rightHoldTime
//       : leftHoldTime;

// }

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
