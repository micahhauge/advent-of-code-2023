import { parseInput } from ".";
import { intersection, sum } from "lodash";

export async function solve() {
  const input = await parseInput();
  console.log(input);

  let total = 0;

  const copiesWonMap: Record<string, typeof input> = {};
  const cardCounts: Record<string, number> = {};
  const processedCardCounts: Record<string, number> = {};

  for (let i = 0; i < input.length; i++) {
    console.log("processing card", input[i].cardId);
    const { winningNumbers, yourNumbers, cardId } = input[i];
    console.log("processing", { winningNumbers, yourNumbers });
    const overlap = intersection(winningNumbers, yourNumbers);
    const numToCopy = overlap.length;

    cardCounts[cardId] = (cardCounts[cardId] || 0) + 1;

    const copiesWonForThisCard = [];
    for (let j = 0; j < numToCopy; j++) {
      const cardWon = input[i + j + 1];
      console.log("you won card", cardWon.cardId);
      copiesWonForThisCard.push(cardWon);
    }

    copiesWonMap[cardId] = copiesWonForThisCard;
  }

  function processCard(cardId: string) {
    console.log("processing ", cardId);
    const cardCount = cardCounts[cardId];

    if (cardCount === 0) {
      return 0;
    }

    const cardIdsWon = copiesWonMap[cardId].map((c) => c.cardId);

    cardIdsWon.forEach((cardIdWon) => {
      console.log(`adding ${cardCount} copies of ${cardIdWon}`);
      cardCounts[cardIdWon] += cardCount;
    });
    cardCounts[cardId] = 0;
    processedCardCounts[cardId] =
      (processedCardCounts[cardId] || 0) + cardCount;

    return cardIdsWon.length;
  }

  console.log("before loop", { cardCounts });

  let max = 10;
  let solved = false;
  while (!solved && max) {
    solved = true;
    Object.entries(cardCounts).forEach(([cardId]) => {
      const wonCount = processCard(cardId);
      console.log("result ", max, { cardCounts, processedCardCounts });

      if (wonCount > 0) {
        solved = false;
      }
    });
    max--;
  }

  return sum([...Object.values(processedCardCounts)]);
}
