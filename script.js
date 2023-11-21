const gameboard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const restart = document.querySelector(".restart");

const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle";

startCells.forEach((cell, index) => {
  const cellElement = document.createElement("div");
  cellElement.classList.add("square");
  cellElement.id = index;
  cellElement.addEventListener("click", addGo);
  gameboard.append(cellElement);
});

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  go = go === "circle" ? "cross" : "circle";
  e.target.append(goDisplay);
  infoDisplay.textContent = "It is now " + go + "'s go";
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winingCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winingCombination.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      restart.style.display = "block";
    }
  });
  winingCombination.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.textContent = "Cross Wins!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      restart.style.display = "block";
    }
  });
}
restart.addEventListener("click", () => {
  window.location.reload();
});
