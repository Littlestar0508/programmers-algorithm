const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "test.txt"),
  )
  .toString()
  .trim()
  .split(/\r?\n/);

const [n, c] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

const obj = {};
const result = [];

for (let i = 0; i < nums.length; i++) {
  if (obj[nums[i]] === undefined) {
    obj[nums[i]] = 1;
    result.push(nums[i]);
  } else {
    obj[nums[i]]++;
  }
}

nums.sort((a, b) => {
  if (obj[a] !== obj[b]) return obj[b] - obj[a];
  else return result.indexOf(a) - result.indexOf(b);
});

console.log(nums.join(" "));
