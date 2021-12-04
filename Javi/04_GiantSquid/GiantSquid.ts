import * as path from 'path';
import * as fs from 'fs';
import { endianness } from 'os';

const data: string = fs.readFileSync(
  path.resolve(__dirname, '../Inputs/04_GiantSquid.txt'),
  { encoding: 'utf8', flag: 'r' }
);

const dataStringArr: string[] = data.split('\n\n');

function checkTableForWin(table: number[][]): boolean {
  let won: boolean = false;

  // check rows
  table.forEach((e: number[]) => {
    if (Math.max(...e) === -1) {
      won = true;
      return won;
    }
  });

  // check columns
  for (let i: number = 0; i < table[0].length; i++) {
    let sum: number = 0;
    for (let j: number = 0; j < table[0].length; j++) {
      sum += table[j][i];
    }
    if (sum === -5) {
      won = true;
      return won;
    }
  }

  return won;
}

function replaceNumInTable(
  table: number[][],
  numToReplace: number,
  numToWrite: number
): number[][] {
  table.forEach((e: number[], i: number) => {
    table[i] = e.map((elem: number) => {
      if (elem === numToReplace) {
        return numToWrite;
      } else {
        return elem;
      }
    });
  });

  return table;
}

function getScoreOfTableWon(tables: number[][][]): number {
  let tableWon: number[][] = undefined;
  let score: number = undefined;

  for (let i: number = 0; i < numbersDrawnNumArr.length; i++) {
    const numberDrawn: number = numbersDrawnNumArr[i];
    for (let j: number = 0; j < tables.length; j++) {
      tables[j] = replaceNumInTable(tables[j], numberDrawn, -1);
      if (checkTableForWin(tables[j])) {
        tableWon = tables[j];
        break;
      }
    }
    if (tableWon) {
      score = calculateScore(tableWon) * numbersDrawnNumArr[i];
      break;
    }
  }

  return score;
}

function calculateScore(table: number[][]): number {
  const newTable = replaceNumInTable(table, -1, 0);
  const sumOfRows: number[] = newTable.map((e: number[]) => {
    return e.reduce((acc: number, curr: number) => acc + curr);
  });

  return sumOfRows.reduce((acc: number, curr: number) => acc + curr);
}

const numbersDrawnNumArr: number[] = dataStringArr
  .shift()
  .split(',')
  .map((e: string) => parseInt(e));

const tablesStr: string[][][] = dataStringArr
  .map((e: string) => e.split('\n'))
  .map((e: string[]) => {
    return e.map((elem: string) => elem.split(' '));
  });

tablesStr.forEach((e: string[][], i: number) => {
  e.forEach((elem: string[], j: number) => {
    tablesStr[i][j] = elem.filter((element: string) => element !== '');
  });
});

const tables: number[][][] = tablesStr.map((e: string[][]) => {
  return e.map((elem: string[]) => {
    return elem.map((element: string) => parseInt(element));
  });
});

console.log(getScoreOfTableWon(tables));
