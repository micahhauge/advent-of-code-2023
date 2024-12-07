import { sum } from "lodash";
import { Equation, parseInput } from ".";

type Operator = "+" | "*" | "||";
type EquationPart = {
  number: number;
  operator: Operator;
};

export async function solve() {
  const input = await parseInput();

  const possibleEquations = input.filter(equationIsPossible);

  const answer = sum(possibleEquations.map((equation) => equation.testValue));

  return answer;
}

function equationIsPossible(equation: Equation) {
  const permutations = getPermutations(equation.numbers);

  for (let i = 0; i < permutations.length; i++) {
    const permutation = permutations[i];
    const answer = calculateEquationAnswer(permutation);

    if (answer === equation.testValue) {
      return true;
    }
  }

  return false;
}

function calculateEquationAnswer(parts: EquationPart[]): number {
  let answer = 0;

  parts.forEach((part) => {
    if (part.operator === "+") {
      answer += part.number;
    } else if (part.operator === "*") {
      answer *= part.number;
    } else if (part.operator === "||") {
      answer = Number(`${answer}${part.number}`);
    } else {
      throw new Error(`Invalid operator: ${part.operator}`);
    }
  });

  return answer;
}

function getPermutations(numbers: number[]): EquationPart[][] {
  let permutations: EquationPart[][] = [];

  for (let i = 0; i < numbers.length; i++) {
    const additionsForThisPart: EquationPart[] = [
      { number: numbers[i], operator: "+" },
      { number: numbers[i], operator: "*" },
      { number: numbers[i], operator: "||" },
    ];

    if (i === 0) {
      permutations.push([{ number: numbers[i], operator: "+" }]);
      continue;
    }

    const newPermutations: EquationPart[][] = [];

    permutations.forEach((permutation) => {
      additionsForThisPart.forEach((addition) => {
        newPermutations.push([...permutation, addition]);
      });
    });

    permutations = newPermutations;
  }

  return permutations;
}

/**
 

10 19

10 + 19
10 - 19

0:
81 40 27

1:
121
41

2:
148
94
68
67

0:
81 40 27

1:
81 + 40
81 - 40

2:

81 + 40 + 27
81 + 40 - 27
81 - 40 + 27
81 - 40 - 27




 */
