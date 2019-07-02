const chai = require('chai');
var expect = chai.expect;
const LottoGuesser = require('../LottoGuesser');
let lottoGuesser;

beforeEach((done) => {
  lottoGuesser = new LottoGuesser();
  done();
})

describe('Lotto Guesser', () => {
  describe('initLottoKey', () => {
    it('should create a blank lottoKey object', (done) => {
      expect(lottoGuesser.lottoKey[1]).to.deep.equal({key: 1, frequency: 0, lastLinePresent: 0});
      expect(lottoGuesser.lottoKey[9]).to.deep.equal({key: 9, frequency: 0, lastLinePresent: 0});
      done();
    })
  })

  describe('processLine', () => {
    it('should correctly parse line to lottoKey', (done) => {
      const line = '1 2 3 4';
      lottoGuesser.processLine(line);
      expect(lottoGuesser.lottoKey[1].frequency).to.equal(1);
      expect(lottoGuesser.lottoKey[1].lastLinePresent).to.equal(1);
      expect(lottoGuesser.lottoKey[2].frequency).to.equal(1);
      expect(lottoGuesser.lottoKey[2].lastLinePresent).to.equal(1);
      expect(lottoGuesser.lottoKey[3].frequency).to.equal(1);
      expect(lottoGuesser.lottoKey[3].lastLinePresent).to.equal(1);
      expect(lottoGuesser.lottoKey[4].frequency).to.equal(1);
      expect(lottoGuesser.lottoKey[4].lastLinePresent).to.equal(1);
      done();
    })
  })

  describe('getLeastOccuringFour', () => {
    it('should return a default if no file has been read', (done) => {
      const result = lottoGuesser.getLeastOccurringFour();
      expect(result).to.deep.equal([1,2,3,4]);
      done();
    });

    it('should return the correct array for a given lottoKey', (done) => {
      const testLottoKey = {
        1: { key: 1, frequency: 5},
        2: { key: 2, frequency: 1},
        3: { key: 3, frequency: 2},
        4: { key: 4, frequency: 3},
        5: { key: 5, frequency: 4}        
      };
      lottoGuesser.hasReadFile = true;
      lottoGuesser.lottoKey = testLottoKey;
      const result = lottoGuesser.getLeastOccurringFour();
      expect(result).to.deep.equal([2,3,4,5]);
      done();
    })
  })

  describe('getLongestAbsentInt', () => {
    it('should return a default if no file has been read', (done) => {
      const result = lottoGuesser.getLongestAbsentInt();
      expect(result).to.equal(1);
      done();
    })

    it('should return the correct int for a given lottoKey', (done) => {
      const testLottoKey = {
        1: { key: 1, lastLinePresent: 5},
        2: { key: 2, lastLinePresent: 1},
        3: { key: 3, lastLinePresent: 2},
        4: { key: 4, lastLinePresent: 3},
        5: { key: 5, lastLinePresent: 4}        
      };
      lottoGuesser.hasReadFile = true;
      lottoGuesser.lottoKey = testLottoKey;
      const result = lottoGuesser.getLongestAbsentInt();
      expect(result).to.equal(2);
      done();
    })
  })

  it('should run correctly with a test data file', async () => {
    const testDataPath = 'test/testData.txt';
    await lottoGuesser.readFile(testDataPath);
    const leastOccuringFour = lottoGuesser.getLeastOccurringFour();
    const longestAbsentInt = lottoGuesser.getLongestAbsentInt();
    expect(leastOccuringFour).to.deep.equal([9,2,3,4]);
    expect(longestAbsentInt).to.equal(9);
  })

  it('should run correctly with an alternate test data file', async () => {
    const testDataPath = 'test/altTestData.txt';
    await lottoGuesser.readFile(testDataPath);
    const leastOccuringFour = lottoGuesser.getLeastOccurringFour();
    const longestAbsentInt = lottoGuesser.getLongestAbsentInt();
    expect(leastOccuringFour).to.deep.equal([9,6,8,3]);
    expect(longestAbsentInt).to.equal(5);
  })
})