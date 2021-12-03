import * as path from 'path';
import * as fs from 'fs';

const data: string = fs.readFileSync(
  path.resolve(__dirname, '../Inputs/03_BinaryDiagnostic.txt'),
  {
    encoding: 'utf8',
    flag: 'r',
  }
);

const dataStringArr: string[] = data.split('\n');

let numberOfOnes: number[] = [];
const numberOfData: number = dataStringArr.length;

for (let i: number = 0; i < dataStringArr[0].length; i++) {
  numberOfOnes.push(0);
}

function invertRate(rate: number[]): number[] {
  return rate.map((e: number) => {
    if (e) {
      return 0;
    } else {
      return 1;
    }
  });
}

function getDecimalOfRate(rate: number[]): number {
  const rateStr: string = rate.map((e: number) => e.toString()).join('');
  return parseInt(rateStr, 2);
}

dataStringArr.forEach((e: string) => {
  e.split('')
    .map((e: string) => parseInt(e))
    .forEach((e: number, i: number) => {
      numberOfOnes[i] += e;
    });
});

const gammaRate: number[] = numberOfOnes.map((e: number) => {
  const numberOfDigitOne: number = e;
  const numberOfDigitZero: number = numberOfData - e;

  if (numberOfDigitOne > numberOfDigitZero) {
    return 1;
  } else {
    return 0;
  }
});

const epsilonRate: number[] = invertRate(gammaRate);

console.log('Power Consumption:');
console.log(getDecimalOfRate(gammaRate) * getDecimalOfRate(epsilonRate));
