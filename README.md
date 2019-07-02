# Lotto Guesser

## Problem Statement
Cobbletown has a lottery (a small version of California's Lotto) in which players guess four number between 1 and 9. Larry likes to play and thinks he has a scheme to pick winning numbers. He keeps a history of past winning numbers in a text data file. Larry thinks that if a number hasn't occurred recently then it is more likely to show up as a winner. (Obviously Larry isn't familiar with the statistical fact that each number has an equal likelihood of being picked, since each week's drawing is an independent event). Larry wants us to write a program to assist him in his wacky scheme.

### INPUT REQUIREMENTS
The lotto history data: a file of unknown length, with four integers per line. Each integer is in the range 1 to 9.
### OUTPUT REQUIREMENTS
1. The four least frequently occurring integers in the history data. (That is, counting all the weeks, the four numbers that appeared fewer times than any others).
2. The one integer with longest time since last occurrence. (That is, if you count backward from now, the number for which you count the most weeks since it occurred).
### FUNCTIONAL REQUIREMENTS
(You may assume that no data validity checking is required).
1. Determine and display the four integers which occur least often in the history data.
Note: To make the problem easier, if there is a tie between two or more numbers for fourth place, it doesn't matter which one is printed.
2. Determine and display the integer which has gone the longest without appearing in a winning sequence.
At a minimum your program must work correctly for the following sample data.

```
Test Data

1 2 3 4
5 6 7 8
8 7 6 5
1 5 6 7
4 3 2 1
```

## Running it
1. Make sure Node v10 and npm are installed
2. Clone project
3. Run ```npm install```
4. (optional) make modifications to the testData or add a new data file and change the path in `index.js`
5. Run ```npm start``` for the default case (with `test/testData.txt`) OR run ```npm start -- <path/to/file> ``` to use another `.txt` file (`test/altTestData.txt` provided for your convenience, so you can run ```npm start -- test/altTestData.txt```)

## Tests
Some basic test cases are contained in the `test/LottoGuesser.test.js` file. To run the test suite, run ```npm run test```.

## Developer Assumptions:
1. All integers in a row of the text file are separated by one (1) space character.
2. As mentioned in the problem statement, data is valid, so all numbers should be an int between 1 and 9 with exactly four (4) ints per row of the input file.
3. Data is listed in ascending date order, i.e. the first row is the oldest row.
