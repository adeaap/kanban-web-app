import { useState, useRef, useEffect } from "react";

type Props = {
  columnId: string;
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
};

type Card = {
  id: string;
  columnId: string;
  title: string;
  description: string;
};

export default function CardsList({ columnId, cards, setCards }: Props) {
  const [addingCard, setAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (addingCard && inputRef.current) {
      inputRef.current.focus();
    }
  }, [addingCard, inputRef.current]);

  return (
    <div
      className="flex flex-col gap-2  h-full"
      onDrop={(e) => {
        console.log("Dropped");
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");
        console.log("Dropped cardId =>", cardId);
        const card = cards.find((card) => card.id === cardId);
        if (card) {
          setCards(
            cards.map((c) => (c.id === cardId ? { ...c, columnId } : c))
          );
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      {cards
        .filter((card) => card.columnId === columnId)
        .map((card) => (
          <div
            key={card.id}
            className="bg-white p-4 rounded-xl shadow-md border border-gray-200 cursor-pointer"
            draggable="true"
            data-card-id={card.id}
          >
            <h3 className="font-bold text-lg">{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}

      {!addingCard ? (
        <button
          className="bg-gray-200 p-4 rounded-xl w-full  text-gray-500"
          onClick={() => {
            setAddingCard(true);
          }}
        >
          Add card
        </button>
      ) : (
        <div className="flex flex-col gap-2 p-1">
          <input
            className="border p-2  rounded border-gray-400 w-full  focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            type="text"
            placeholder="Column name"
            ref={inputRef}
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setCards([
                  ...cards,
                  {
                    id: Math.random().toString(36).substr(2, 9),
                    columnId,
                    title: cardTitle,
                    description: "",
                  },
                ]);

                setAddingCard(false);
                setCardTitle("");
              }
            }}
          />
          <div className="flex justify-between ">
            <button
              className="flex items-center justify-center gap-2 bg-gray-200 px-3 py-2 text-gray-500 font-bold rounded-3xl hover:bg-gray-300 min-w-24"
              onClick={() => {
                setAddingCard(false);
                setCardTitle("");
              }}
            >
              Cancel
            </button>

            <button
              className="flex items-center justify-center gap-2 bg-indigo-500 px-3 py-2 text-white font-bold rounded-3xl hover:bg-indigo-400  min-w-24"
              onClick={() => {
                setCards([
                  ...cards,
                  {
                    id: Math.random().toString(36).substr(2, 9),
                    columnId,
                    title: cardTitle,
                    description: "",
                  },
                ]);
                setAddingCard(false);
                setCardTitle("");
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
