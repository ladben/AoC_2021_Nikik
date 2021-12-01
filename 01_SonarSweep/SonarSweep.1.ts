let fs = require('fs');

const data: String = fs.readFileSync('SonarSweepINput.1.txt', {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr: number[] = data.split('\n').map((e) => parseInt(e));

const inc_dec: number[] = dataArr.map((e: number, i: number) => {
  if (i === 0) {
    return 0;
  } else if (e > dataArr[i - 1]) {
    return 1;
  } else {
    return 0;
  }
});

const sum = inc_dec.reduce((acc: number, curr: number) => acc + curr);

console.log(sum);
