import Board from "./board";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="p-6">
        <Board />
      </div>
    </div>
  );
}
