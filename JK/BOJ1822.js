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

const [A, B] = input[0].split(" ").map(Number);
const arrA = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const arrB = input[2]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const ans = [];

const binarySearch = (arr, target) => {
  let start = 0;
  let end = arr.length;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (target === arr[mid]) {
      return true;
    } else if (target < arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return false;
};

arrA.forEach((e) => {
  if (!binarySearch(arrB, e)) ans.push(e);
});

console.log(ans.length === 0 ? ans.length : ans.length + "\n" + ans.join(" "));
