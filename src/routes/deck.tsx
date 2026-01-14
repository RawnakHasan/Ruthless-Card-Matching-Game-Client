import { createFileRoute } from "@tanstack/react-router";
import { generateDeck } from "../lib/generateDeck";

export const Route = createFileRoute("/deck")({
  component: RouteComponent,
});

const deck = generateDeck();

function RouteComponent() {
  return (
    <div className="p-4 grid grid-cols-12 gap-4">
      {deck.map((card) => (
        <img key={card.id} src={card.image} alt={String(card.name)} />
      ))}
    </div>
  );
}
