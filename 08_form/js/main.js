const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const nextCanvas = document.getElementById("next");
const nextCtx = nextCanvas.getContext("2d");

const restartButton =
  document.getElementById("restartButton");

const newGameButton =
  document.getElementById("newGameButton");


const COLS = 10;
const ROWS = 20;
const BLOCK = 30;

ctx.scale(BLOCK, BLOCK);


/* 테트리스 블록 */

const SHAPES = {

  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],

  J: [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0]
  ],

  L: [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0]
  ],

  O: [
    [4, 4],
    [4, 4]
  ],

  S: [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]
  ],

  T: [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0]
  ],

  Z: [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]
  ]

};


const COLORS = [
  null,
  "#35d9ff",
  "#5076ff",
  "#ff9c45",
  "#ffd84d",
  "#53e58a",
  "#ba69ff",
  "#ff557a"
];


const TYPES =
  ["I", "J", "L", "O", "S", "T", "Z"];


let board;
let player;
let nextPiece;
let score;
let lines;
let level;
let dropCounter;
let dropInterval;
let lastTime;
let gameRunning;
let paused;


/* 게임판 생성 */

function createBoard() {

  return Array.from(
    { length: ROWS },
    () => Array(COLS).fill(0)
  );

}


/* 랜덤 블록 */

function createPiece() {

  const type =
    TYPES[
      Math.floor(
        Math.random() * TYPES.length
      )
    ];

  return {

    matrix:
      SHAPES[type].map(
        row => [...row]
      ),

    x: 0,
    y: 0

  };

}


/* 새 블록 등장 */

function spawnPiece() {

  if (!nextPiece) {

    nextPiece =
      createPiece();

  }


  player =
    nextPiece;


  nextPiece =
    createPiece();


  player.y = 0;


  player.x =
    Math.floor(COLS / 2) -
    Math.ceil(
      player.matrix[0].length / 2
    );


  drawNext();


  if (collide()) {

    endGame();

  }

}


/* 화면 그리기 */

function draw() {

  ctx.fillStyle =
    "#090c18";


  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  drawGrid();


  drawMatrix(
    board,
    {
      x: 0,
      y: 0
    },
    ctx
  );


  drawGhost();


  drawMatrix(
    player.matrix,
    player,
    ctx
  );

}


/* 격자 */

function drawGrid() {

  ctx.lineWidth =
    0.02;


  ctx.strokeStyle =
    "rgba(255,255,255,0.05)";


  for (
    let x = 0;
    x <= COLS;
    x++
  ) {

    ctx.beginPath();

    ctx.moveTo(
      x,
      0
    );

    ctx.lineTo(
      x,
      ROWS
    );

    ctx.stroke();

  }


  for (
    let y = 0;
    y <= ROWS;
    y++
  ) {

    ctx.beginPath();

    ctx.moveTo(
      0,
      y
    );

    ctx.lineTo(
      COLS,
      y
    );

    ctx.stroke();

  }

}


/* 블록 그리기 */

function drawMatrix(
  matrix,
  offset,
  context
) {

  matrix.forEach(
    (row, y) => {

      row.forEach(
        (value, x) => {

          if (
            value !== 0
          ) {

            context.fillStyle =
              COLORS[value];


            context.fillRect(
              x + offset.x,
              y + offset.y,
              1,
              1
            );


            context.strokeStyle =
              "rgba(255,255,255,0.35)";


            context.lineWidth =
              0.05;


            context.strokeRect(
              x + offset.x + 0.05,
              y + offset.y + 0.05,
              0.9,
              0.9
            );


            context.fillStyle =
              "rgba(255,255,255,0.12)";


            context.fillRect(
              x + offset.x + 0.1,
              y + offset.y + 0.1,
              0.8,
              0.15
            );

          }

        }
      );

    }
  );

}


/* 고스트 블록 */

function drawGhost() {

  let ghostY =
    player.y;


  while (
    !collisionAt(
      player.matrix,
      player.x,
      ghostY + 1
    )
  ) {

    ghostY++;

  }


  ctx.globalAlpha =
    0.17;


  drawMatrix(
    player.matrix,
    {
      x: player.x,
      y: ghostY
    },
    ctx
  );


  ctx.globalAlpha =
    1;

}


/* 다음 블록 */

function drawNext() {

  nextCtx.clearRect(
    0,
    0,
    nextCanvas.width,
    nextCanvas.height
  );


  const blockSize =
    22;


  const matrix =
    nextPiece.matrix;


  const width =
    matrix[0].length *
    blockSize;


  const height =
    matrix.length *
    blockSize;


  const offsetX =
    (
      nextCanvas.width -
      width
    ) / 2;


  const offsetY =
    (
      nextCanvas.height -
      height
    ) / 2;


  matrix.forEach(
    (row, y) => {

      row.forEach(
        (value, x) => {

          if (
            value !== 0
          ) {

            nextCtx.fillStyle =
              COLORS[value];


            nextCtx.fillRect(
              offsetX +
              x * blockSize,

              offsetY +
              y * blockSize,

              blockSize - 2,
              blockSize - 2
            );


            nextCtx.fillStyle =
              "rgba(255,255,255,.18)";


            nextCtx.fillRect(
              offsetX +
              x * blockSize + 3,

              offsetY +
              y * blockSize + 3,

              blockSize - 8,
              4
            );

          }

        }
      );

    }
  );

}


/* 충돌 */

function collisionAt(
  matrix,
  px,
  py
) {

  for (
    let y = 0;
    y < matrix.length;
    y++
  ) {

    for (
      let x = 0;
      x < matrix[y].length;
      x++
    ) {

      if (
        matrix[y][x] !== 0
      ) {

        const boardX =
          px + x;


        const boardY =
          py + y;


        if (
          boardX < 0 ||
          boardX >= COLS ||
          boardY >= ROWS
        ) {

          return true;

        }


        if (
          boardY >= 0 &&
          board[boardY][boardX] !== 0
        ) {

          return true;

        }

      }

    }

  }


  return false;

}


function collide() {

  return collisionAt(
    player.matrix,
    player.x,
    player.y
  );

}


/* 블록 고정 */

function merge() {

  player.matrix.forEach(
    (row, y) => {

      row.forEach(
        (value, x) => {

          if (
            value !== 0
          ) {

            board[
              y + player.y
            ][
              x + player.x
            ] = value;

          }

        }
      );

    }
  );

}


/* 줄 삭제 */

function clearLines() {

  let cleared =
    0;


  outer:

  for (
    let y = ROWS - 1;
    y >= 0;
    y--
  ) {

    for (
      let x = 0;
      x < COLS;
      x++
    ) {

      if (
        board[y][x] === 0
      ) {

        continue outer;

      }

    }


    const row =
      board
        .splice(y, 1)[0]
        .fill(0);


    board.unshift(row);


    y++;

    cleared++;

  }


  if (
    cleared > 0
  ) {

    const points = [
      0,
      100,
      300,
      500,
      800
    ];


    score +=
      points[cleared] *
      level;


    lines +=
      cleared;


    level =
      Math.floor(
        lines / 10
      ) + 1;


    dropInterval =
      Math.max(
        100,
        800 -
        (level - 1) * 70
      );


    updateInfo();

  }

}


/* 아래 이동 */

function playerDrop() {

  if (
    !gameRunning ||
    paused
  ) {

    return;

  }


  player.y++;


  if (
    collide()
  ) {

    player.y--;

    merge();

    clearLines();

    spawnPiece();

  }


  dropCounter =
    0;

}


/* 하드 드롭 */

function hardDrop() {

  if (
    !gameRunning ||
    paused
  ) {

    return;

  }


  let distance =
    0;


  while (
    !collide()
  ) {

    player.y++;

    distance++;

  }


  player.y--;

  distance--;


  score +=
    Math.max(
      0,
      distance * 2
    );


  merge();

  clearLines();

  spawnPiece();

  updateInfo();


  dropCounter =
    0;

}


/* 좌우 이동 */

function playerMove(
  direction
) {

  if (
    !gameRunning ||
    paused
  ) {

    return;

  }


  player.x +=
    direction;


  if (
    collide()
  ) {

    player.x -=
      direction;

  }

}


/* 회전 */

function rotate(
  matrix
) {

  return matrix[0]
    .map(
      (_, index) =>
        matrix.map(
          row =>
            row[index]
        )
    )
    .map(
      row =>
        row.reverse()
    );

}


function playerRotate() {

  if (
    !gameRunning ||
    paused
  ) {

    return;

  }


  const oldMatrix =
    player.matrix;


  const oldX =
    player.x;


  player.matrix =
    rotate(
      player.matrix
    );


  let offset =
    1;


  while (
    collide()
  ) {

    player.x +=
      offset;


    offset =
      -(
        offset +
        (
          offset > 0
            ? 1
            : -1
        )
      );


    if (
      Math.abs(offset) >
      player.matrix[0].length
    ) {

      player.matrix =
        oldMatrix;


      player.x =
        oldX;


      return;

    }

  }

}


/* 정보 업데이트 */

function updateInfo() {

  document.getElementById(
    "score"
  ).textContent =
    score.toLocaleString();


  document.getElementById(
    "level"
  ).textContent =
    level;


  document.getElementById(
    "lines"
  ).textContent =
    lines;

}


/* 게임 종료 */

function endGame() {

  gameRunning =
    false;


  document.getElementById(
    "finalScore"
  ).textContent =
    score.toLocaleString();


  document.getElementById(
    "gameOver"
  ).classList.add(
    "show"
  );

}


/* 일시정지 */

function togglePause() {

  if (
    !gameRunning
  ) {

    return;

  }


  paused =
    !paused;


  document.getElementById(
    "pauseScreen"
  ).classList.toggle(
    "show",
    paused
  );


  if (
    !paused
  ) {

    lastTime =
      performance.now();

  }

}


/* 새 게임 */

function restartGame() {

  board =
    createBoard();


  score =
    0;


  lines =
    0;


  level =
    1;


  dropCounter =
    0;


  dropInterval =
    800;


  lastTime =
    0;


  gameRunning =
    true;


  paused =
    false;


  nextPiece =
    null;


  document.getElementById(
    "gameOver"
  ).classList.remove(
    "show"
  );


  document.getElementById(
    "pauseScreen"
  ).classList.remove(
    "show"
  );


  updateInfo();

  spawnPiece();

}


/* 버튼 */

restartButton.addEventListener(
  "click",
  restartGame
);


newGameButton.addEventListener(
  "click",
  restartGame
);


/* 키보드 */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      [
        "ArrowLeft",
        "ArrowRight",
        "ArrowDown",
        "ArrowUp",
        "Space"
      ].includes(event.code)
    ) {

      event.preventDefault();

    }


    if (
      event.code ===
      "ArrowLeft"
    ) {

      playerMove(-1);

    }


    else if (
      event.code ===
      "ArrowRight"
    ) {

      playerMove(1);

    }


    else if (
      event.code ===
      "ArrowDown"
    ) {

      playerDrop();

      score++;

      updateInfo();

    }


    else if (
      event.code ===
      "ArrowUp"
    ) {

      playerRotate();

    }


    else if (
      event.code ===
      "Space"
    ) {

      hardDrop();

    }


    else if (
      event.code ===
      "KeyP"
    ) {

      togglePause();

    }

  }
);


/* 게임 루프 */

function update(
  time = 0
) {

  const deltaTime =
    time - lastTime;


  lastTime =
    time;


  if (
    gameRunning &&
    !paused
  ) {

    dropCounter +=
      deltaTime;


    if (
      dropCounter >
      dropInterval
    ) {

      playerDrop();

    }

  }


  if (
    player
  ) {

    draw();

  }


  requestAnimationFrame(
    update
  );

}


/* 시작 */

restartGame();

update();