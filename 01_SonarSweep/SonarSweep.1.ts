let fs = require('fs');

const data: String = fs.readFileSync('SonarSweepINput.1.txt', {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr: number[] = data.split('\n').map((e) => parseInt(e));

function increasingSum(data: number[]): number {
  const inc_dec: number[] = data.map((e: number, i: number) => {
    if (i === 0) {
      return 0;
    } else if (e > data[i - 1]) {
      return 1;
    } else {
      return 0;
    }
  });

  const sum = inc_dec.reduce((acc: number, curr: number) => acc + curr);

  return sum;
}

console.log(increasingSum(dataArr));
