import { useDiscardPile } from "../../hooks/gameSelectors";
import { Card } from "../../types";

function rotationFromCard(card: Card) {
  const str = card.id ?? "";
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash) % 360;
}

const colorHexMap = {
  Red: "#FF5249",
  Blue: "#53A5DC",
  Green: "#34C838",
  Yellow: "#F4D84B",
};

const DiscardPile = () => {
  const discardPile = useDiscardPile();
  const topCard = discardPile[discardPile.length - 1];

  return (
    <div className="flex items-center justify-center aspect-square size-40 relative">
      {discardPile.length === 0 ? (
        <span className="text-center">Game Didn't Start yet</span>
      ) : (
        <>
          {discardPile.map((card, index) => (
            <img
              key={index}
              src={card.image}
              className="absolute inset-0"
              style={{
                transform: `rotate(${rotationFromCard(card)}deg)`,
                zIndex: index,
              }}
              draggable={false}
            />
          ))}

          {/* Show chosen color indicator for Wild cards */}
          {topCard?.type === "Wild" && topCard.chosenColor && (
            <div
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-text z-50 shadow-lg"
              style={{ backgroundColor: colorHexMap[topCard.chosenColor] }}
              title={`Chosen color: ${topCard.chosenColor}`}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DiscardPile;
