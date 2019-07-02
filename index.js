const LottoGuesser = require('./LottoGuesser');

async function run() {
  const guesser = new LottoGuesser();
  const filePath = process.argv[2] || 'testData.txt';
  await guesser.readFile(filePath);
  const leastOccuringFour = guesser.getLeastOccurringFour();
  const longestAbsentInt = guesser.getLongestAbsentInt();
  console.log("Winning Combo? ", leastOccuringFour);
  console.log("Longest Absent Number: ", longestAbsentInt);
}

run();


