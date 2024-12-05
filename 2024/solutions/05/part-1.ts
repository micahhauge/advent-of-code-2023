import { parseInput, RuleTuple } from ".";
import { sum } from "lodash";

export async function solve() {
  const { rules, updates } = await parseInput(false);

  const correctUpdates = updates.filter((update) =>
    updateIsCorrect(rules, update),
  );

  const midpoints = correctUpdates.map(getMiddleOfUpdate);
  const sumOfMidpoints = sum(midpoints);

  return sumOfMidpoints;
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
