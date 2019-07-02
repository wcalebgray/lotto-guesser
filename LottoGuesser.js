const _ = require('lodash');
const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);

class LottoGuesser {
  constructor() {
    this.linesRead = 0;
    this.hasReadFile = false;
    this.initLottoKey();
  }

  initLottoKey() {
    this.lottoKey = {};
    for (let i = 1; i < 10; i++) {
      this.lottoKey[i] = {
        key: i,
        frequency: 0,
        lastLinePresent: 0
      };
    }
    return;
  }

  async readFile(filePath) {
    await eachLine(filePath, (line) => this.processLine(line));
    this.hasReadFile = true;
  }

  processLine(line) {
    this.linesRead++;
    const parsedLine = line.split(" ");
    for (let num of parsedLine) {
      this.lottoKey[num].frequency++;
      this.lottoKey[num].lastLinePresent = this.linesRead;
    }
  }

  getLeastOccurringFour() {
    if(!this.hasReadFile) {
      console.log("No data file read, returning default");
      return [1, 2, 3, 4];
    }
    const leastOccurringFour = _.chain(this.lottoKey)
      .sortBy([(k) => k.frequency])
      .map((k) => k.key)
      .value()
      .slice(0, 4);

    return leastOccurringFour;

  }

  getLongestAbsentInt() {
    if(!this.hasReadFile) {
      console.log("No data file read, returning default");
      return 1;
    }
    const arrayOfLottoKey = _.values(this.lottoKey);
    let minKey = _.minBy(arrayOfLottoKey, (key) => key.lastLinePresent);
    return minKey.key;
  }
}

module.exports = LottoGuesser