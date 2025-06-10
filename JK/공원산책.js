function solution(park, routes) {
  park = park.map((item) => {
    return item.split("");
  });

  let x = 0;
  let y = 0;

  for (let i = 0; i < park.length; i++) {
    for (let j = 0; j < park[0].length; j++) {
      if (park[i][j] === "S") {
        x = i;
        y = j;
      }
    }
  }

  for (let i = 0; i < routes.length; i++) {
    const forward = routes[i].charAt(0);
    const straight = routes[i].charAt(2);
    const now = [x, y];

    switch (forward) {
      case "N":
        for (let j = 0; j < straight; j++) {
          x--;
          if (x < 0 || x >= park.length || park[x][y] === "X") {
            x = now[0];
            break;
          }
        }
        break;
      case "S":
        for (let j = 0; j < straight; j++) {
          x++;
          if (x < 0 || x >= park.length || park[x][y] === "X") {
            x = now[0];
            break;
          }
        }
        break;
      case "W":
        for (let j = 0; j < straight; j++) {
          y--;
          if (y < 0 || y >= park[0].length || park[x][y] === "X") {
            y = now[1];
            break;
          }
        }
        break;
      case "E":
        for (let j = 0; j < straight; j++) {
          y++;
          if (y < 0 || y >= park[0].length || park[x][y] === "X") {
            y = now[1];
            break;
          }
        }
        break;
    }
  }

  return [x, y];
}

console.log(solution(["SOO", "OOO", "OOO"], ["E 2", "S 2", "W 1"]));
