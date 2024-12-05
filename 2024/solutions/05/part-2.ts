import { parseInput, RuleTuple } from ".";
import { sum } from "lodash";

export async function solve() {
  const { rules, updates } = await parseInput(false);

  const incorrectUpdates = updates.filter(
    (update) => !updateIsCorrect(rules, update),
  );

  const fixedUpdates = incorrectUpdates.map((update) =>
    fixUpdate(rules, update),
  );

  console.log({ fixedUpdates });

  const midpoints = fixedUpdates.map(getMiddleOfUpdate);
  const sumOfMidpoints = sum(midpoints);

  console.log({ midpoints, sumOfMidpoints });
  return sumOfMidpoints;
}

function fixUpdate(rules: RuleTuple[], update: number[]) {
  let fixedUpdate: number[] = [];

  update.forEach((num) => {
    const insertPositionFound = false;

    for (let i = 0; i < fixedUpdate.length + 1; i++) {
      const potentialRule = [
        ...fixedUpdate.slice(0, i),
        num,
        ...fixedUpdate.slice(i),
      ];

      if (updateIsCorrect(rules, potentialRule)) {
        fixedUpdate = potentialRule;
        break;
      }
    }
  });

  return fixedUpdate;
}

function updateIsCorrect(rules: RuleTuple[], updates: number[]) {
  const brokenRuleIndex = rules.findIndex(
    (rule) => !updateAdheresToRule(rule, updates),
  );

  if (brokenRuleIndex === -1) {
    return true;
  } else {
    return false;
  }
}

function updateAdheresToRule(rule: RuleTuple, update: number[]) {
  const [left, right] = rule;

  const leftIndex = update.indexOf(left);
  const rightIndex = update.indexOf(right);

  if (leftIndex === -1 || rightIndex === -1) {
    return true;
  }

  if (leftIndex > rightIndex) {
    return false;
  } else {
    return true;
  }
}

function getMiddleOfUpdate(update: number[]) {
  const middleIndex = Math.floor(update.length / 2);
  return update[middleIndex];
}
