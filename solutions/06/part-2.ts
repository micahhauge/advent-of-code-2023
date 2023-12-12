import { Race, parseInput } from ".";
import { map, max, range, difference } from "lodash";

export async function solve() {
  const { races } = await parseInput();
  const race = races[0];

  function getWorstWinningTime() {
    for (let i = 0; i < race.time; i++) {
      if (distance(i) > race.distanceRecord) {
        return i;
      }
    }
    return -1;
  }

  function getBestWinningTime() {
    for (let i = race.time; i > 0; i--) {
      if (distance(i) > race.distanceRecord) {
        return i;
      }
    }
    return -1;
  }

  const worstWinningTime = getWorstWinningTime();
  const bestWinningTime = getBestWinningTime();

  console.table({ worstWinningTime, bestWinningTime });

  const answer = bestWinningTime - worstWinningTime;

  function distance(waitTime: number) {
    return performantDistanceForTime(waitTime, race.time);
  }
  return answer;
}

export async function solveOld() {
  const { races } = await parseInput();
  const race = races[0];

  // const times = range(0, race.time + 1);
  // const fastestTime = fastestTimeBinarySearch(times);

  // console.log({ fastestTime });

  // const rightTime = rightTimeBinarySearch(times, fastestTime);
  // const leftTime = leftTimeBinarySearch(times, fastestTime);

  // const solutionCount = rightTime - leftTime;
  // console.log({ fastestTime, leftTime, rightTime, solutionCount });

  // const f = distance(35765);
  // const fMin1 = distance(35764);
  // const fPlus1 = distance(35764);

  // console.log({ f, fMin1, fPlus1 });

  function leftTimeBinarySearch(fastestTime: number) {
    let left: number = 0;
    let right: number = fastestTime - 1;

    while (left <= right) {
      const mid: number = Math.floor((left + right) / 2);

      // if the middle is the point, return it
      if (
        distance(mid) <= distance(fastestTime) &&
        distance(mid + 1) > distance(fastestTime)
      ) {
        return mid;
      }

      if (distance(mid) <= race.distanceRecord) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return -1;
  }

  function rightTimeBinarySearch(times: number[], fastestTime: number) {
    let left: number = fastestTime + 1;
    let right: number = times.length - 1;

    while (left <= right) {
      const mid: number = Math.floor((left + right) / 2);

      // if the middle is the max, return it
      if (distance(mid) === race.distanceRecord) {
        return mid;
      }

      if (distance(mid) > race.distanceRecord) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return -1;
  }

  function fastestTimeBinarySearch(times: number[]) {
    let left: number = 0;
    let right: number = times.length - 1;

    while (left <= right) {
      const mid: number = Math.floor((left + right) / 2);

      // if the middle is the max, return it
      if (
        mid === 0 ||
        (distance(mid) > distance(mid + 1) && distance(mid) > distance(mid - 1))
      ) {
        return mid;
      }

      if (mid > 0 && distance(mid) < distance(mid + 1)) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return -1;
  }

  function distance(waitTime: number) {
    return performantDistanceForTime(waitTime, race.time);
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

function performantDistanceForTime(timeHeld: number, totalTime: number) {
  const speed = timeHeld;
  const timeLeft = totalTime - timeHeld;
  return speed * timeLeft;
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
