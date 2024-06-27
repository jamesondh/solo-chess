"use client";

import { DragEvent, useState } from "react";

const DEFAULT_BOARD = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "♜", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "♛", "", "", "", "", "♞", ""],
  ["", "", "", "♝", "", "", "", ""],
  ["", "", "", "", "", "", "♟", ""],
  ["", "", "♚", "", "", "", "", ""],
];

export default function Board() {
  const [boardState, setBoardState] = useState<string[][]>(DEFAULT_BOARD);

  const handleDragStart = (
    e: DragEvent<HTMLSpanElement>,
    piece: string,
    x: number,
    y: number
  ) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ piece, x, y }));
  };

  const handleDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    newX: number,
    newY: number
  ) => {
    e.preventDefault();
    const { piece, x, y } = JSON.parse(e.dataTransfer.getData("text"));

    const newBoardState = boardState.map((row) => [...row]);
    newBoardState[y][x] = "";
    newBoardState[newY][newX] = piece;

    setBoardState(newBoardState);
  };

  return (
    <div className="grid grid-cols-8">
      {boardState.map((row, y) =>
        row.map((piece, x) => (
          <div
            key={`${x},${y}`}
            className={`w-12 h-12 md:w-20 md:h-20 pb-1.5 md:pb-3 select-none flex justify-center items-center text-6xl md:text-8xl cursor-default text-black ${
              (x + y) % 2 === 0 ? "bg-purple-100" : "bg-purple-400"
            }`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, x, y)}
          >
            {piece && (
              <span
                draggable
                onDragStart={(e) => handleDragStart(e, piece, x, y)}
              >
                {piece}
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}
